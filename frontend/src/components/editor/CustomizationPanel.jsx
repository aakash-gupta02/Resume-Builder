'use client';

import { useResume } from '@/context/ResumeContext';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Palette, 
  Type, 
  Maximize2, 
  Layout, 
  Layers, 
  Settings2,
  RotateCcw,
  Check
} from 'lucide-react';

const colorPresets = [
  { name: 'Professional Blue', primary: '#2563eb', secondary: '#1e40af', accent: '#3b82f6', text: '#1f2937', background: '#ffffff', sectionBg: '#f8fafc', border: '#e2e8f0', heading: '#111827' },
  { name: 'Modern Teal', primary: '#0d9488', secondary: '#0f766e', accent: '#14b8a6', text: '#1f2937', background: '#ffffff', sectionBg: '#f0fdfa', border: '#ccfbf1', heading: '#134e4a' },
  { name: 'Elegant Purple', primary: '#7c3aed', secondary: '#6d28d9', accent: '#8b5cf6', text: '#1f2937', background: '#ffffff', sectionBg: '#faf5ff', border: '#e9d5ff', heading: '#4c1d95' },
  { name: 'Classic Navy', primary: '#1e3a5f', secondary: '#0f172a', accent: '#3b82f6', text: '#334155', background: '#ffffff', sectionBg: '#f1f5f9', border: '#cbd5e1', heading: '#0f172a' },
  { name: 'Warm Orange', primary: '#ea580c', secondary: '#c2410c', accent: '#f97316', text: '#1f2937', background: '#ffffff', sectionBg: '#fff7ed', border: '#fed7aa', heading: '#9a3412' },
  { name: 'Forest Green', primary: '#16a34a', secondary: '#15803d', accent: '#22c55e', text: '#1f2937', background: '#ffffff', sectionBg: '#f0fdf4', border: '#bbf7d0', heading: '#14532d' },
  { name: 'Rose Pink', primary: '#e11d48', secondary: '#be123c', accent: '#f43f5e', text: '#1f2937', background: '#ffffff', sectionBg: '#fff1f2', border: '#fecdd3', heading: '#881337' },
  { name: 'Slate Gray', primary: '#475569', secondary: '#334155', accent: '#64748b', text: '#1f2937', background: '#ffffff', sectionBg: '#f8fafc', border: '#e2e8f0', heading: '#0f172a' },
  { name: 'Dark Mode', primary: '#3b82f6', secondary: '#2563eb', accent: '#60a5fa', text: '#e2e8f0', background: '#0f172a', sectionBg: '#1e293b', border: '#334155', heading: '#f8fafc' },
];

const fontOptions = [
  { value: 'Inter', label: 'Inter', category: 'Sans-serif' },
  { value: 'Roboto', label: 'Roboto', category: 'Sans-serif' },
  { value: 'Open Sans', label: 'Open Sans', category: 'Sans-serif' },
  { value: 'Lato', label: 'Lato', category: 'Sans-serif' },
  { value: 'Poppins', label: 'Poppins', category: 'Sans-serif' },
  { value: 'Montserrat', label: 'Montserrat', category: 'Sans-serif' },
  { value: 'Source Sans Pro', label: 'Source Sans Pro', category: 'Sans-serif' },
  { value: 'Nunito', label: 'Nunito', category: 'Sans-serif' },
  { value: 'Raleway', label: 'Raleway', category: 'Sans-serif' },
  { value: 'Playfair Display', label: 'Playfair Display', category: 'Serif' },
  { value: 'Merriweather', label: 'Merriweather', category: 'Serif' },
  { value: 'Lora', label: 'Lora', category: 'Serif' },
  { value: 'Georgia', label: 'Georgia', category: 'Serif' },
  { value: 'Times New Roman', label: 'Times New Roman', category: 'Serif' },
  { value: 'Fira Code', label: 'Fira Code', category: 'Monospace' },
  { value: 'JetBrains Mono', label: 'JetBrains Mono', category: 'Monospace' },
];

export default function CustomizationPanel() {
  const { customization, updateCustomization, resetCustomization } = useResume();

  const handleColorChange = (key, value) => {
    updateCustomization({
      colors: { ...customization.colors, [key]: value }
    });
  };

  const handleTypographyChange = (key, value) => {
    updateCustomization({
      typography: { ...customization.typography, [key]: value }
    });
  };

  const handleSpacingChange = (key, value) => {
    updateCustomization({
      spacing: { ...customization.spacing, [key]: value }
    });
  };

  const handleLayoutChange = (key, value) => {
    updateCustomization({
      layout: { ...customization.layout, [key]: value }
    });
  };

  const handleSectionStyleChange = (key, value) => {
    updateCustomization({
      sectionStyles: { ...customization.sectionStyles, [key]: value }
    });
  };

  const handleOptionsChange = (key, value) => {
    updateCustomization({
      options: { ...customization.options, [key]: value }
    });
  };

  const applyColorPreset = (preset) => {
    updateCustomization({ colors: preset });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">Customize</h3>
        <Button variant="ghost" size="sm" onClick={resetCustomization}>
          <RotateCcw className="h-4 w-4 mr-1" />
          Reset
        </Button>
      </div>

      <Accordion type="multiple" defaultValue={['colors', 'typography']} className="space-y-2">
        {/* Colors Section */}
        <AccordionItem value="colors" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span>Colors</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            {/* Color Presets */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Color Presets</Label>
              <div className="grid grid-cols-3 gap-2">
                {colorPresets.map((preset, index) => (
                  <button
                    key={index}
                    onClick={() => applyColorPreset(preset)}
                    className="group relative p-2 rounded-lg border hover:border-primary transition-colors"
                    title={preset.name}
                  >
                    <div className="flex gap-1 justify-center">
                      <div 
                        className="w-4 h-4 rounded-full border" 
                        style={{ backgroundColor: preset.primary }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border" 
                        style={{ backgroundColor: preset.accent }}
                      />
                      <div 
                        className="w-4 h-4 rounded-full border" 
                        style={{ backgroundColor: preset.heading }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground mt-1 block truncate">
                      {preset.name}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Individual Color Pickers */}
            <div className="space-y-3">
              <ColorPicker
                label="Primary Color"
                value={customization.colors?.primary || '#2563eb'}
                onChange={(v) => handleColorChange('primary', v)}
              />
              <ColorPicker
                label="Secondary Color"
                value={customization.colors?.secondary || '#1e40af'}
                onChange={(v) => handleColorChange('secondary', v)}
              />
              <ColorPicker
                label="Accent Color"
                value={customization.colors?.accent || '#3b82f6'}
                onChange={(v) => handleColorChange('accent', v)}
              />
              <ColorPicker
                label="Text Color"
                value={customization.colors?.text || '#1f2937'}
                onChange={(v) => handleColorChange('text', v)}
              />
              <ColorPicker
                label="Heading Color"
                value={customization.colors?.heading || '#111827'}
                onChange={(v) => handleColorChange('heading', v)}
              />
              <ColorPicker
                label="Background"
                value={customization.colors?.background || '#ffffff'}
                onChange={(v) => handleColorChange('background', v)}
              />
              <ColorPicker
                label="Section Background"
                value={customization.colors?.sectionBg || '#f8fafc'}
                onChange={(v) => handleColorChange('sectionBg', v)}
              />
              <ColorPicker
                label="Border Color"
                value={customization.colors?.border || '#e2e8f0'}
                onChange={(v) => handleColorChange('border', v)}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Typography Section */}
        <AccordionItem value="typography" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Type className="h-4 w-4" />
              <span>Typography</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div>
                <Label className="text-sm mb-1.5 block">Heading Font</Label>
                <Select
                  value={customization.typography?.headingFont || 'Inter'}
                  onValueChange={(v) => handleTypographyChange('headingFont', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">({font.category})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">Body Font</Label>
                <Select
                  value={customization.typography?.bodyFont || 'Inter'}
                  onValueChange={(v) => handleTypographyChange('bodyFont', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {fontOptions.map((font) => (
                      <SelectItem key={font.value} value={font.value}>
                        <span style={{ fontFamily: font.value }}>{font.label}</span>
                        <span className="text-xs text-muted-foreground ml-2">({font.category})</span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Base Font Size: {customization.typography?.baseFontSize || 14}px
                </Label>
                <Slider
                  value={[customization.typography?.baseFontSize || 14]}
                  onValueChange={([v]) => handleTypographyChange('baseFontSize', v)}
                  min={10}
                  max={18}
                  step={1}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Heading Size Scale: {customization.typography?.headingSizeScale || 1.2}x
                </Label>
                <Slider
                  value={[customization.typography?.headingSizeScale || 1.2]}
                  onValueChange={([v]) => handleTypographyChange('headingSizeScale', v)}
                  min={1}
                  max={2}
                  step={0.1}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Line Height: {customization.typography?.lineHeight || 1.5}
                </Label>
                <Slider
                  value={[customization.typography?.lineHeight || 1.5]}
                  onValueChange={([v]) => handleTypographyChange('lineHeight', v)}
                  min={1}
                  max={2}
                  step={0.1}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Letter Spacing: {customization.typography?.letterSpacing || 0}em
                </Label>
                <Slider
                  value={[customization.typography?.letterSpacing || 0]}
                  onValueChange={([v]) => handleTypographyChange('letterSpacing', v)}
                  min={-0.05}
                  max={0.1}
                  step={0.01}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Spacing Section */}
        <AccordionItem value="spacing" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Maximize2 className="h-4 w-4" />
              <span>Spacing</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div>
                <Label className="text-sm mb-1.5 block">
                  Page Margin: {customization.spacing?.pageMargin || 40}px
                </Label>
                <Slider
                  value={[customization.spacing?.pageMargin || 40]}
                  onValueChange={([v]) => handleSpacingChange('pageMargin', v)}
                  min={20}
                  max={80}
                  step={5}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Section Gap: {customization.spacing?.sectionGap || 24}px
                </Label>
                <Slider
                  value={[customization.spacing?.sectionGap || 24]}
                  onValueChange={([v]) => handleSpacingChange('sectionGap', v)}
                  min={8}
                  max={48}
                  step={4}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Item Gap: {customization.spacing?.itemGap || 16}px
                </Label>
                <Slider
                  value={[customization.spacing?.itemGap || 16]}
                  onValueChange={([v]) => handleSpacingChange('itemGap', v)}
                  min={4}
                  max={32}
                  step={2}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Content Padding: {customization.spacing?.contentPadding || 16}px
                </Label>
                <Slider
                  value={[customization.spacing?.contentPadding || 16]}
                  onValueChange={([v]) => handleSpacingChange('contentPadding', v)}
                  min={0}
                  max={32}
                  step={4}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Layout Section */}
        <AccordionItem value="layout" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Layout className="h-4 w-4" />
              <span>Layout</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div>
                <Label className="text-sm mb-1.5 block">Layout Type</Label>
                <Select
                  value={customization.layout?.columns || 'single'}
                  onValueChange={(v) => handleLayoutChange('columns', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Single Column</SelectItem>
                    <SelectItem value="two-column">Two Columns</SelectItem>
                    <SelectItem value="sidebar-left">Sidebar Left</SelectItem>
                    <SelectItem value="sidebar-right">Sidebar Right</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {(customization.layout?.columns === 'sidebar-left' || 
                customization.layout?.columns === 'sidebar-right') && (
                <div>
                  <Label className="text-sm mb-1.5 block">
                    Sidebar Width: {customization.layout?.sidebarWidth || 35}%
                  </Label>
                  <Slider
                    value={[customization.layout?.sidebarWidth || 35]}
                    onValueChange={([v]) => handleLayoutChange('sidebarWidth', v)}
                    min={20}
                    max={45}
                    step={5}
                  />
                </div>
              )}

              <div>
                <Label className="text-sm mb-1.5 block">Header Style</Label>
                <Select
                  value={customization.layout?.headerStyle || 'classic'}
                  onValueChange={(v) => handleLayoutChange('headerStyle', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="classic">Classic (Centered)</SelectItem>
                    <SelectItem value="modern">Modern (Left-aligned)</SelectItem>
                    <SelectItem value="minimal">Minimal</SelectItem>
                    <SelectItem value="banner">Banner (Full Width)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Photo</Label>
                <Switch
                  checked={customization.layout?.showPhoto ?? true}
                  onCheckedChange={(v) => handleLayoutChange('showPhoto', v)}
                />
              </div>

              {customization.layout?.showPhoto && (
                <>
                  <div>
                    <Label className="text-sm mb-1.5 block">Photo Shape</Label>
                    <Select
                      value={customization.layout?.photoStyle || 'rounded'}
                      onValueChange={(v) => handleLayoutChange('photoStyle', v)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="circle">Circle</SelectItem>
                        <SelectItem value="rounded">Rounded Square</SelectItem>
                        <SelectItem value="square">Square</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label className="text-sm mb-1.5 block">
                      Photo Size: {customization.layout?.photoSize || 100}px
                    </Label>
                    <Slider
                      value={[customization.layout?.photoSize || 100]}
                      onValueChange={([v]) => handleLayoutChange('photoSize', v)}
                      min={60}
                      max={150}
                      step={10}
                    />
                  </div>
                </>
              )}

              <div>
                <Label className="text-sm mb-1.5 block">Contact Info Display</Label>
                <Select
                  value={customization.layout?.contactStyle || 'inline'}
                  onValueChange={(v) => handleLayoutChange('contactStyle', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inline">Inline (with separators)</SelectItem>
                    <SelectItem value="stacked">Stacked (vertical)</SelectItem>
                    <SelectItem value="grid">Grid (2 columns)</SelectItem>
                    <SelectItem value="icons">Icons Only</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Section Styles */}
        <AccordionItem value="sectionStyles" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Layers className="h-4 w-4" />
              <span>Section Styles</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div>
                <Label className="text-sm mb-1.5 block">Heading Style</Label>
                <Select
                  value={customization.sectionStyles?.headingStyle || 'underline'}
                  onValueChange={(v) => handleSectionStyleChange('headingStyle', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="simple">Simple</SelectItem>
                    <SelectItem value="underline">Underline</SelectItem>
                    <SelectItem value="background">Background</SelectItem>
                    <SelectItem value="border-left">Left Border</SelectItem>
                    <SelectItem value="border-bottom">Bottom Border</SelectItem>
                    <SelectItem value="uppercase">Uppercase</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">
                  Border Radius: {customization.sectionStyles?.borderRadius || 8}px
                </Label>
                <Slider
                  value={[customization.sectionStyles?.borderRadius || 8]}
                  onValueChange={([v]) => handleSectionStyleChange('borderRadius', v)}
                  min={0}
                  max={24}
                  step={2}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Section Dividers</Label>
                <Switch
                  checked={customization.sectionStyles?.showDividers ?? false}
                  onCheckedChange={(v) => handleSectionStyleChange('showDividers', v)}
                />
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">Divider Style</Label>
                <Select
                  value={customization.sectionStyles?.dividerStyle || 'solid'}
                  onValueChange={(v) => handleSectionStyleChange('dividerStyle', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="solid">Solid Line</SelectItem>
                    <SelectItem value="dashed">Dashed Line</SelectItem>
                    <SelectItem value="dotted">Dotted Line</SelectItem>
                    <SelectItem value="double">Double Line</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-sm mb-1.5 block">Date Display Format</Label>
                <Select
                  value={customization.sectionStyles?.dateFormat || 'MMM YYYY'}
                  onValueChange={(v) => handleSectionStyleChange('dateFormat', v)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="MMM YYYY">Jan 2024</SelectItem>
                    <SelectItem value="MM/YYYY">01/2024</SelectItem>
                    <SelectItem value="YYYY">2024</SelectItem>
                    <SelectItem value="MMMM YYYY">January 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Additional Options */}
        <AccordionItem value="options" className="border rounded-lg px-4">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-2">
              <Settings2 className="h-4 w-4" />
              <span>Additional Options</span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Icons</Label>
                <Switch
                  checked={customization.options?.showIcons ?? true}
                  onCheckedChange={(v) => handleOptionsChange('showIcons', v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Skill Bars</Label>
                <Switch
                  checked={customization.options?.showSkillBars ?? true}
                  onCheckedChange={(v) => handleOptionsChange('showSkillBars', v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Show Language Bars</Label>
                <Switch
                  checked={customization.options?.showLanguageBars ?? true}
                  onCheckedChange={(v) => handleOptionsChange('showLanguageBars', v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Accent Bullets</Label>
                <Switch
                  checked={customization.options?.accentBullets ?? true}
                  onCheckedChange={(v) => handleOptionsChange('accentBullets', v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Capitalize Headings</Label>
                <Switch
                  checked={customization.options?.capitalizeHeadings ?? false}
                  onCheckedChange={(v) => handleOptionsChange('capitalizeHeadings', v)}
                />
              </div>

              <div className="flex items-center justify-between">
                <Label className="text-sm">Compact Mode</Label>
                <Switch
                  checked={customization.options?.compactMode ?? false}
                  onCheckedChange={(v) => handleOptionsChange('compactMode', v)}
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

// Color Picker Component
function ColorPicker({ label, value, onChange }) {
  return (
    <div className="flex items-center justify-between">
      <Label className="text-sm">{label}</Label>
      <div className="flex items-center gap-2">
        <div className="relative">
          <input
            type="color"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-8 h-8 rounded cursor-pointer border-0 p-0"
          />
        </div>
        <Input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-24 h-8 text-xs font-mono"
          placeholder="#000000"
        />
      </div>
    </div>
  );
}
