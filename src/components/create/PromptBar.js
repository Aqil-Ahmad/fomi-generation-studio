"use client";

import { useId, useImperativeHandle, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ChevronDown, ImageIcon, Sparkles, Video } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Kbd } from "@/components/ui/Kbd";
import { Menu } from "@/components/ui/Menu";
import { Segmented } from "@/components/ui/Segmented";
import templates from "@/data/templates.json";
import { ASPECT_RATIOS, COUNTS, DEFAULT_SETTINGS, MODELS, PROMPT_LIMIT, modelLabel } from "@/lib/options";
import { RatioIcon } from "./RatioIcon";
import { UploadButton } from "./UploadButton";

const MODE_OPTIONS = [
  { value: "image", label: "Image", icon: <ImageIcon aria-hidden="true" size={17} strokeWidth={2} /> },
  { value: "video", label: "Video", icon: <Video aria-hidden="true" size={17} strokeWidth={2} /> },
];

const COUNT_OPTIONS = COUNTS.map((count) => ({ value: count, label: String(count) }));

const pickerClasses =
  "inline-flex h-10 items-center gap-2 rounded-control border border-line bg-surface px-3 text-sm text-ink-2 transition-colors hover:border-line-strong hover:text-ink pointer-coarse:min-h-11";

const TEMPLATE_PROMPTS = Object.fromEntries(
  templates.groups.flatMap((group) => group.templates.map((template) => [template.id, template.prompt])),
);

function withMode(settings, mode) {
  return { ...settings, mode, model: MODELS[mode][0].value };
}

export function PromptBar({ ref, onGenerate, submitting }) {
  const searchParams = useSearchParams();
  const urlMode = searchParams.get("mode");
  const urlTemplate = searchParams.get("template");
  const [prompt, setPrompt] = useState(TEMPLATE_PROMPTS[urlTemplate] ?? "");
  const [seenTemplate, setSeenTemplate] = useState(urlTemplate);
  const [settings, setSettings] = useState(() => (MODELS[urlMode] ? withMode(DEFAULT_SETTINGS, urlMode) : DEFAULT_SETTINGS));
  const [seenUrlMode, setSeenUrlMode] = useState(urlMode);
  const [upload, setUpload] = useState(null);
  const fieldRef = useRef(null);
  const fieldId = useId();

  if (urlTemplate !== seenTemplate) {
    setSeenTemplate(urlTemplate);
    if (TEMPLATE_PROMPTS[urlTemplate]) setPrompt(TEMPLATE_PROMPTS[urlTemplate]);
  }

  if (urlMode !== seenUrlMode) {
    setSeenUrlMode(urlMode);
    if (MODELS[urlMode]) setSettings((current) => withMode(current, urlMode));
  }

  useImperativeHandle(ref, () => ({
    fill(nextPrompt, nextSettings) {
      setPrompt(nextPrompt);
      if (nextSettings) setSettings(nextSettings);
      fieldRef.current?.focus();
    },
  }));

  const trimmed = prompt.trim();
  const canSubmit = trimmed.length > 0 && !submitting;
  const update = (patch) => setSettings((current) => ({ ...current, ...patch }));

  function submit(event) {
    event?.preventDefault();
    if (!canSubmit) return;
    onGenerate({ ...settings, prompt: trimmed, reference: upload?.name ?? null });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter" && (event.metaKey || event.ctrlKey)) submit(event);
  }

  return (
    <form
      onSubmit={submit}
      aria-label="Create"
      className="rounded-panel border border-accent/40 bg-surface/95 p-3 shadow-bar backdrop-blur-md sm:p-4"
    >
      <label htmlFor={fieldId} className="sr-only">
        Describe what you want to create
      </label>
      <textarea
        id={fieldId}
        ref={fieldRef}
        value={prompt}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={handleKeyDown}
        maxLength={PROMPT_LIMIT}
        rows={2}
        placeholder="Describe your imaginations to be converted to piece of art ...."
        className="block max-h-40 min-h-12 w-full resize-none bg-transparent px-1 text-md leading-relaxed text-ink outline-none field-sizing-content placeholder:text-muted"
      />

      <div className="mt-3 flex flex-wrap items-center gap-2 sm:gap-3">
        <Segmented
          label="Create"
          options={MODE_OPTIONS}
          value={settings.mode}
          onChange={(mode) => setSettings((current) => withMode(current, mode))}
          itemClassName="w-11"
        />
        <UploadButton file={upload} onChange={setUpload} />
        <Segmented
          label="Number of results"
          options={COUNT_OPTIONS}
          value={settings.count}
          onChange={(count) => update({ count })}
        />
        <Menu
          label="Aspect ratio"
          items={ASPECT_RATIOS}
          value={settings.aspectRatio}
          onSelect={(aspectRatio) => update({ aspectRatio })}
          placement="top-start"
          renderTrigger={(props) => (
            <button type="button" {...props} aria-label={`Aspect ratio ${settings.aspectRatio}`} className={pickerClasses}>
              <RatioIcon ratio={settings.aspectRatio} />
              {settings.aspectRatio}
              <ChevronDown aria-hidden="true" size={15} />
            </button>
          )}
        />
        <Menu
          label="Model"
          items={MODELS[settings.mode]}
          value={settings.model}
          onSelect={(model) => update({ model })}
          placement="top-start"
          renderTrigger={(props) => (
            <button type="button" {...props} className={`${pickerClasses} min-w-44 justify-between`}>
              <span>
                Model: <span className="text-ink">{modelLabel(settings.mode, settings.model)}</span>
              </span>
              <ChevronDown aria-hidden="true" size={15} />
            </button>
          )}
        />

        <div className="flex w-full items-center justify-end gap-3 sm:ml-auto sm:w-auto">
          {prompt.length > PROMPT_LIMIT * 0.8 && (
            <span className="text-xs text-muted" aria-live="polite">
              {PROMPT_LIMIT - prompt.length} left
            </span>
          )}
          <span className="hidden items-center gap-1 text-xs text-muted lg:flex" aria-hidden="true">
            <Kbd>⌘</Kbd>
            <Kbd>Enter</Kbd>
          </span>
          <Button type="submit" variant="accent" size="lg" disabled={!canSubmit} aria-busy={submitting} className="max-sm:flex-1">
            <Sparkles aria-hidden="true" size={19} strokeWidth={2} />
            {submitting ? "Starting…" : "Generate"}
          </Button>
        </div>
      </div>
    </form>
  );
}
