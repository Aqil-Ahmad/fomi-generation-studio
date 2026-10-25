"use client";

import { useEffect, useReducer, useRef } from "react";
import { api } from "@/lib/api";
import { readStored, writeStored } from "@/lib/storage";

const STORAGE_KEY = "creations";
const POLL_MS = 500;
const KEEP = 24;

function reducer(state, action) {
  switch (action.type) {
    case "restored":
      return { ...state, groups: action.groups, favorites: action.favorites };

    case "started":
      return {
        ...state,
        groups: [
          { id: action.localId, jobId: null, settings: action.settings, status: "queued", progress: 0, results: [], createdAt: action.createdAt },
          ...state.groups,
        ].slice(0, KEEP),
      };

    case "queued":
      return { ...state, groups: state.groups.map((group) => (group.id === action.localId ? { ...group, jobId: action.jobId } : group)) };

    case "progress":
      return {
        ...state,
        groups: state.groups.map((group) =>
          group.id === action.localId
            ? { ...group, status: action.snapshot.status, progress: action.snapshot.progress, results: action.snapshot.results, error: action.snapshot.error }
            : group,
        ),
      };

    case "failed":
      return {
        ...state,
        groups: state.groups.map((group) => (group.id === action.localId ? { ...group, status: "failed", error: action.message } : group)),
      };

    case "removed":
      return { ...state, groups: state.groups.filter((group) => group.id !== action.localId) };

    case "favorite":
      return {
        ...state,
        favorites: state.favorites.includes(action.resultId)
          ? state.favorites.filter((id) => id !== action.resultId)
          : [...state.favorites, action.resultId],
      };

    default:
      throw new Error(`Unknown generation action: ${action.type}`);
  }
}

function pollJob(localId, jobId, dispatch, timers) {
  async function poll() {
    try {
      const snapshot = await api.getJob(jobId);
      dispatch({ type: "progress", localId, snapshot });
      if (snapshot.status === "queued" || snapshot.status === "running") {
        timers.current.set(localId, setTimeout(poll, POLL_MS));
      }
    } catch (error) {
      dispatch({ type: "failed", localId, message: error.message });
    }
  }
  poll();
}

export function useGeneration() {
  const [state, dispatch] = useReducer(reducer, { groups: [], favorites: [] });
  const timers = useRef(new Map());
  const restored = useRef(false);

  useEffect(() => {
    const saved = readStored(STORAGE_KEY, null);
    if (saved) dispatch({ type: "restored", groups: saved.groups ?? [], favorites: saved.favorites ?? [] });
    restored.current = true;
    const pending = timers.current;
    return () => pending.forEach((timer) => clearTimeout(timer));
  }, []);

  useEffect(() => {
    if (!restored.current) return;
    writeStored(STORAGE_KEY, {
      groups: state.groups.filter((group) => group.status === "done"),
      favorites: state.favorites,
    });
  }, [state.groups, state.favorites]);

  async function generate(settings) {
    const localId = crypto.randomUUID();
    dispatch({ type: "started", localId, settings, createdAt: new Date().toISOString() });
    try {
      const { jobId } = await api.generate(settings);
      dispatch({ type: "queued", localId, jobId });
      pollJob(localId, jobId, dispatch, timers);
    } catch (error) {
      dispatch({ type: "failed", localId, message: error.message });
    }
  }

  function retry(group) {
    dispatch({ type: "removed", localId: group.id });
    return generate(group.settings);
  }

  return {
    groups: state.groups,
    favorites: state.favorites,
    generate,
    retry,
    remove: (localId) => dispatch({ type: "removed", localId }),
    toggleFavorite: (resultId) => dispatch({ type: "favorite", resultId }),
  };
}
