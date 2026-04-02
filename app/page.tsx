"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { AlertTriangle, Bell, Check, CheckCircle2, ChevronRight, ChevronsLeft, ChevronsRight, Component, Edit, FormInput, Info, LayoutDashboard, Layers, Loader2, Menu, MessageSquare, Moon, Palette, Search, Settings, Star, Sun, User, X } from "lucide-react";

type ThemePalette = "base" | "enterprise" | "lagoon";

const PALETTE_STORAGE_KEY = "ui-demo-theme-palette";

const menuItems = [
  { id: "overview", label: "概览", icon: LayoutDashboard },
  { id: "general", label: "通用", icon: Component },
  { id: "form", label: "表单", icon: FormInput },
  { id: "feedback", label: "反馈", icon: MessageSquare },
  { id: "data", label: "数据", icon: Layers },
  { id: "nav", label: "导航", icon: Menu },
] as const;

const topModules = [
  { id: "workspace", label: "工作台" },
  { id: "system", label: "组件中心" },
  { id: "assets", label: "设计资产" },
] as const;

const paletteOptions: {
  id: ThemePalette;
  label: string;
  description: string;
  chips: string[];
}[] = [
  { id: "base", label: "经典中性", description: "延续当前默认配色，干净克制，适合作为标准基线。", chips: ["#171717", "#6b7280", "#d4d4d8", "#ffffff"] },
  { id: "enterprise", label: "企业蓝灰", description: "蓝灰主导的后台风格，专业稳重，信息层级清晰。", chips: ["#0f62fe", "#0043ce", "#edf5ff", "#c6c6c6"] },
  { id: "lagoon", label: "科技青蓝", description: "青蓝色调沉稳通透，适合云服务、数据平台等技术驱动型产品。", chips: ["#1f9bb6", "#70d6b2", "#dff7f4", "#1f3344"] },
];

const showToast = (type: "success" | "error" | "warning" | "info") => {
  const msgs = {
    success: { t: "成功", d: "操作已完成" },
    error: { t: "错误", d: "操作失败" },
    warning: { t: "警告", d: "请注意" },
    info: { t: "提示", d: "通知消息" },
  } satisfies Record<"success" | "error" | "warning" | "info", { t: string; d: string }>;

  const message = msgs[type];

  switch (type) {
    case "success":
      toast.success(message.t, { description: message.d });
      break;
    case "error":
      toast.error(message.t, { description: message.d });
      break;
    case "warning":
      toast.warning(message.t, { description: message.d });
      break;
    default:
      toast.info(message.t, { description: message.d });
      break;
  }
};

function isThemePalette(value: string | null): value is ThemePalette {
  return paletteOptions.some((option) => option.id === value);
}

function normalizeStoredPalette(value: string | null): ThemePalette | null {
  return isThemePalette(value) ? value : null;
}

function ThemeToolbar({
  activePalette,
  setActivePalette,
  isDarkMode,
  toggleMode,
}: {
  activePalette: ThemePalette;
  setActivePalette: (palette: ThemePalette) => void;
  isDarkMode: boolean;
  toggleMode: () => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <div className="-mx-1 overflow-x-auto pb-1">
        <div className="flex min-w-max flex-nowrap gap-2 px-1">
        {paletteOptions.map((option) => {
          const selected = activePalette === option.id;

          return (
            <button
              key={option.id}
              type="button"
              onClick={() => setActivePalette(option.id)}
              className={cn(
                "group w-[250px] shrink-0 rounded-xl border px-3 py-2 text-left transition-all duration-200",
                selected
                  ? "theme-selected-surface shadow-[0_10px_24px_color-mix(in_oklch,var(--app-highlight)_18%,transparent)]"
                  : "theme-outline bg-card/70 hover:bg-accent/70"
              )}
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-sm font-semibold">
                  <span className="truncate">{option.label}</span>
                  <div className="flex items-center gap-1 pt-0.5">
                    {option.chips.map((chip) => (
                      <span
                        key={chip}
                        className="h-3 w-3 rounded-full ring-1 ring-black/10 dark:ring-white/15"
                        style={{ backgroundColor: chip }}
                      />
                    ))}
                  </div>
                  {selected && <Check className="h-4 w-4 text-primary" />}
                </div>
                <p className="text-xs text-muted-foreground">
                  {option.description}
                </p>
              </div>
            </button>
          );
        })}
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <Button variant="outline" className="theme-input border-border/70 rounded-xl" onClick={toggleMode}>
          {isDarkMode ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          {isDarkMode ? "切换浅色" : "切换深色"}
        </Button>
        <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 px-3 py-1 text-primary">
          {isDarkMode ? "当前深色模式" : "当前浅色模式"}
        </Badge>
      </div>
    </div>
  );
}

function Overview({ progress }: { progress: number }) {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[{ t: "访问量", v: "45,231", i: LayoutDashboard }, { t: "用户", v: "2,350", i: User }, { t: "销售", v: "¥12,234", i: Star }, { t: "订单", v: "573", i: CheckCircle2 }].map((s, i) => (
          <Card key={i} className="cursor-pointer hover:-translate-y-0.5" onClick={() => showToast("info")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{s.t}</CardTitle>
              <s.i className="theme-title h-4 w-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.v}</div>
              <p className="theme-positive text-xs">+{10 + i * 5}% 较上月</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="theme-accent-panel">
          <CardHeader><CardTitle>任务进度</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[{ l: "数据同步", v: progress }, { l: "文件上传", v: (progress + 30) % 100 }, { l: "系统备份", v: (progress + 60) % 100 }].map((t, i) => (
              <div key={i} className="space-y-2">
                <div className="flex justify-between text-sm"><span>{t.l}</span><span>{t.v}%</span></div>
                <Progress value={t.v} className="transition-all" />
              </div>
            ))}
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>最近活动</CardTitle></CardHeader>
          <CardContent>
            <ScrollArea className="h-[200px]">
              {["创建项目", "更新配置", "删除文件", "导出报表", "上传资源"].map((a, i) => (
                <div key={i} className="flex cursor-pointer items-center gap-4 rounded-xl px-3 py-2 transition-colors hover:bg-muted/70" onClick={() => toast.info(a)}>
                  <div className={`h-2 w-2 rounded-full ${["bg-green-500", "bg-blue-500", "bg-red-500", "bg-violet-500", "bg-orange-500"][i]}`} />
                  <div className="flex-1"><p className="text-sm font-medium">{a}</p><p className="text-xs text-muted-foreground">{i + 1} 小时前</p></div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function General({ generalTab, setGeneralTab, loading, handleLoading }: { generalTab: string; setGeneralTab: (value: string) => void; loading: boolean; handleLoading: () => void }) {
  return (
    <div className="space-y-6">
      <Tabs value={generalTab} onValueChange={setGeneralTab}>
        <TabsList variant="line">
          <TabsTrigger value="buttons">按钮</TabsTrigger>
          <TabsTrigger value="cards">卡片</TabsTrigger>
          <TabsTrigger value="badges">徽章</TabsTrigger>
          <TabsTrigger value="avatars">头像</TabsTrigger>
        </TabsList>
        <TabsContent value="buttons" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle>按钮样式</CardTitle>
              <CardDescription>按类型、尺寸、状态和图标组合展示按钮规范，便于统一选型。</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.35fr)_minmax(280px,0.65fr)]">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">按钮类型</h4>
                      <p className="text-sm text-muted-foreground">主操作保持唯一，危险操作只用于不可逆行为。</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">Variant</Badge>
                  </div>
                  <div className="mt-4 flex flex-1 content-start flex-wrap gap-3">
                    <Button onClick={() => showToast("success")}>主按钮</Button>
                    <Button variant="secondary" onClick={() => showToast("info")}>次按钮</Button>
                    <Button variant="outline" onClick={() => showToast("warning")}>边框按钮</Button>
                    <Button variant="destructive" onClick={() => showToast("error")}>危险按钮</Button>
                    <Button variant="ghost">幽灵按钮</Button>
                    <Button variant="link">文字按钮</Button>
                  </div>
                </div>

                <div className="flex h-full flex-col rounded-2xl border bg-card p-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">使用建议</h4>
                    <p className="text-sm text-muted-foreground">同一区域只保留一个主按钮，危险按钮默认放在操作区右侧。</p>
                  </div>
                  <div className="mt-4 space-y-2.5 text-sm leading-6 text-muted-foreground">
                    <p>Primary：提交、创建、确认等关键动作。</p>
                    <p>Secondary / Outline：辅助操作与并列操作。</p>
                    <p>Danger：删除、停用、覆盖等高风险动作。</p>
                  </div>
                </div>
              </div>

              <div className="grid items-stretch gap-4 lg:grid-cols-2">
                <div className="flex h-full flex-col rounded-2xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">按钮尺寸</h4>
                      <p className="text-sm text-muted-foreground">小型用于紧凑工具栏，默认用于正文区，大型用于重点引导。</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">Size</Badge>
                  </div>
                  <div className="mt-4 flex flex-1 content-start flex-wrap items-center gap-3">
                    <Button size="sm">小按钮</Button>
                    <Button>默认按钮</Button>
                    <Button size="lg">大按钮</Button>
                    <Button size="icon-sm" variant="outline" aria-label="搜索">
                      <Search className="h-4 w-4" />
                    </Button>
                    <Button size="icon" variant="outline" aria-label="设置">
                      <Settings className="h-4 w-4" />
                    </Button>
                    <Button size="icon-lg" variant="outline" aria-label="通知">
                      <Bell className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex h-full flex-col rounded-2xl border bg-card p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="space-y-1">
                      <h4 className="text-sm font-semibold">图标组合</h4>
                      <p className="text-sm text-muted-foreground">优先使用前置图标提升识别度，后置图标用于继续、跳转等动作。</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">Icon</Badge>
                  </div>
                  <div className="mt-4 flex flex-1 content-start flex-wrap gap-3">
                    <Button><Check className="mr-1 h-4 w-4" />保存更改</Button>
                    <Button variant="outline"><Search className="mr-1 h-4 w-4" />搜索筛选</Button>
                    <Button variant="secondary">查看详情<ChevronRight className="ml-1 h-4 w-4" /></Button>
                    <Button variant="ghost"><Edit className="mr-1 h-4 w-4" />编辑</Button>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border bg-card p-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold">按钮状态</h4>
                    <p className="text-sm text-muted-foreground">统一展示 hover、禁用、加载和高风险状态，减少团队自行脑补的空间。</p>
                  </div>
                  <Badge variant="outline" className="rounded-full">State</Badge>
                </div>
                <div className="mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.15fr)_minmax(280px,0.85fr)]">
                  <div className="rounded-2xl border bg-card p-4">
                    <div className="space-y-1">
                      <h5 className="text-sm font-semibold">真实交互状态</h5>
                      <p className="text-sm text-muted-foreground">直接悬停下方按钮，验证 hover 是否符合预期。</p>
                    </div>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <Button>默认状态</Button>
                      <Button variant="outline">悬停查看</Button>
                      <Button disabled>禁用状态</Button>
                      <Button variant="secondary" disabled>不可编辑</Button>
                      <Button onClick={handleLoading} disabled={loading}>
                        {loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />加载中</> : "加载状态"}
                      </Button>
                      <Button variant="destructive"><AlertTriangle className="mr-1 h-4 w-4" />删除项目</Button>
                    </div>
                  </div>

                  <div className="rounded-2xl border bg-card p-4">
                    <div className="space-y-1">
                      <h5 className="text-sm font-semibold">状态说明</h5>
                      <p className="text-sm text-muted-foreground">Hover 不改变语义，只增强反馈。Danger 和 Disabled 必须保持清晰边界。</p>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 px-3 py-2">
                        <span className="font-medium text-foreground">Default / Hover</span>
                        <span className="text-right">主按钮加深，边框按钮出现浅底反馈</span>
                      </div>
                      <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 px-3 py-2">
                        <span className="font-medium text-foreground">Disabled</span>
                        <span className="text-right">降低对比度，不响应交互</span>
                      </div>
                      <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 px-3 py-2">
                        <span className="font-medium text-foreground">Loading</span>
                        <span className="text-right">保留按钮位置，用旋转图标反馈进行中</span>
                      </div>
                      <div className="flex items-start justify-between gap-4 rounded-xl border border-border/70 px-3 py-2">
                        <span className="font-medium text-foreground">Danger</span>
                        <span className="text-right">仅用于不可逆操作，并与普通按钮拉开层级</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:-translate-y-0.5">
              <CardHeader><CardTitle>基础卡片</CardTitle><CardDescription>卡片描述</CardDescription></CardHeader>
              <CardContent><p>卡片内容区域</p></CardContent>
              <CardFooter><Button size="sm">操作</Button></CardFooter>
            </Card>
            <Card className="bg-gradient-to-br from-primary/10 via-accent/40 to-transparent">
              <CardHeader><CardTitle>渐变卡片</CardTitle></CardHeader>
              <CardContent><Badge>Featured</Badge></CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between"><CardTitle>统计</CardTitle><Star className="h-4 w-4 text-yellow-500" /></CardHeader>
              <CardContent><div className="text-3xl font-bold">1,234</div></CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="badges" className="mt-4">
          <Card>
            <CardHeader><CardTitle>徽章样式</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Badge>Default</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="outline">Outline</Badge>
              <Badge variant="destructive">Destructive</Badge>
              {["新功能", "热门", "推荐"].map((t, i) => <Badge key={i} className="cursor-pointer hover:scale-105 transition-transform" onClick={() => toast.info(t)}>{t}</Badge>)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="avatars" className="mt-4">
          <Card>
            <CardHeader><CardTitle>头像组件</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap items-center gap-4">
              <Avatar className="cursor-pointer ring-primary/20 transition-all hover:ring-2" onClick={() => toast.success("点击了头像")}>
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
              <Avatar><AvatarFallback>用户</AvatarFallback></Avatar>
              <Avatar className="h-8 w-8"><AvatarFallback>小</AvatarFallback></Avatar>
              <Avatar className="h-14 w-14"><AvatarFallback>大</AvatarFallback></Avatar>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Form({ switchOn, setSwitchOn, isDarkMode, setTheme, sliderValue, setSliderValue }: { switchOn: boolean; setSwitchOn: (value: boolean) => void; isDarkMode: boolean; setTheme: (theme: string) => void; sliderValue: number[]; setSliderValue: (value: number[]) => void }) {
  return (
    <div className="space-y-6">
      <Card className="theme-accent-panel overflow-hidden border-primary/12">
        <CardHeader>
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <CardTitle>表单规范</CardTitle>
                <Badge variant="outline" className="rounded-full">Field States</Badge>
              </div>
              <CardDescription>将常见字段、选择器和交互状态集中展示，避免切换 tab 才能理解表单系统。</CardDescription>
            </div>
            <div className="grid gap-2 sm:grid-cols-3 lg:w-[420px]">
              {[
                { label: "字段类型", value: "10+" },
                { label: "状态样例", value: "4" },
                { label: "使用场景", value: "配置 / 资料" },
              ].map((item) => (
                <div key={item.label} className="rounded-2xl border border-primary/12 bg-card px-4 py-3">
                  <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/80">{item.label}</p>
                  <p className="mt-1 text-sm font-semibold text-foreground">{item.value}</p>
                </div>
              ))}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,0.65fr)]">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>基础字段</CardTitle>
            <CardDescription>按真实表单节奏组织字段，不再把每个输入拆成独立卡片。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4 rounded-3xl border border-border/70 bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">联系信息</h4>
                  <p className="text-xs text-muted-foreground">覆盖文本、邮箱、手机号与官网地址等基础资料字段。</p>
                </div>
                <Badge variant="outline" className="rounded-full">Text Fields</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="contact-name">姓名</Label>
                  <Input id="contact-name" defaultValue="赵明" className="theme-input" />
                  <p className="text-xs text-muted-foreground">优先展示真实示例值，避免空表单造成理解成本。</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-email">邮箱</Label>
                  <Input id="contact-email" type="email" defaultValue="zhao@company.com" className="theme-input" />
                  <p className="text-xs text-muted-foreground">适合通知收件人、账户登录名等结构化信息。</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-phone">手机号</Label>
                  <Input id="contact-phone" type="tel" placeholder="138 0000 0000" className="theme-input" />
                  <p className="text-xs text-muted-foreground">占位符保留格式提示，便于后续对接输入掩码。</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contact-site">官网地址</Label>
                  <Input id="contact-site" type="url" placeholder="https://example.com" className="theme-input" />
                  <p className="text-xs text-muted-foreground">带协议的示例更贴近真实业务配置场景。</p>
                </div>
              </div>
            </div>

            <div className="space-y-4 rounded-3xl border border-border/70 bg-card p-5">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">项目设置</h4>
                  <p className="text-xs text-muted-foreground">把数值、日期和长文本组合成更接近真实业务的一个表单段。</p>
                </div>
                <Badge variant="outline" className="rounded-full">Structured Fields</Badge>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="team-size">团队规模</Label>
                  <Input id="team-size" type="number" min="1" defaultValue="24" className="theme-input" />
                  <p className="text-xs text-muted-foreground">适合配额、人数和阈值等数值型配置。</p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="launch-date">上线日期</Label>
                  <Input id="launch-date" type="date" className="theme-input" />
                  <p className="text-xs text-muted-foreground">日期选择更适合里程碑、生效时间和排期场景。</p>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between gap-3">
                  <Label htmlFor="bio">项目简介</Label>
                  <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">Textarea</span>
                </div>
                <Textarea id="bio" defaultValue="面向企业知识与数据平台的后台系统，强调权限、配置与内容协作。" className="theme-input min-h-32" />
                <p className="text-xs text-muted-foreground">建议 80-200 字，聚焦业务目标和核心用户。</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>字段状态</CardTitle>
            <CardDescription>集中展示可编辑、只读、禁用和校验报错状态。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="readonly-code">系统编号</Label>
                <Badge variant="outline" className="rounded-full text-[11px]">只读</Badge>
              </div>
              <Input id="readonly-code" readOnly defaultValue="RAG-PRD-2026-031" className="theme-input bg-muted/40" />
              <p className="text-xs text-muted-foreground">只读字段保留信息密度，但不允许用户修改。</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="disabled-owner">负责人</Label>
                <Badge variant="outline" className="rounded-full text-[11px]">禁用</Badge>
              </div>
              <Input id="disabled-owner" disabled defaultValue="已同步企业通讯录" className="theme-input" />
              <p className="text-xs text-muted-foreground">禁用态应降低对比度，但仍保持内容可读。</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="invalid-email">通知邮箱</Label>
                <Badge variant="outline" className="rounded-full border-destructive/25 bg-destructive/10 text-[11px] text-destructive">报错</Badge>
              </div>
              <Input id="invalid-email" type="email" aria-invalid="true" defaultValue="ops@company" className="theme-input" />
              <p className="text-xs text-destructive">请输入有效邮箱地址，示例：ops@company.com</p>
            </div>
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label htmlFor="required-field">审批人</Label>
                <Badge variant="outline" className="rounded-full text-[11px]">必填</Badge>
              </div>
              <Input id="required-field" placeholder="请选择审批责任人" className="theme-input" />
              <p className="text-xs text-muted-foreground">该字段为必填，提交前必须指定审批责任人。</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="h-full">
          <CardHeader>
            <CardTitle>选择与偏好</CardTitle>
            <CardDescription>包含单选、下拉、复选和开关，模拟真实配置表单。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label>部署环境</Label>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">Radio</span>
              </div>
              <RadioGroup defaultValue="staging" className="gap-3">
                <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                  <RadioGroupItem value="dev" />
                  <span className="text-sm">开发环境</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                  <RadioGroupItem value="staging" />
                  <span className="text-sm">预发环境</span>
                </label>
                <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                  <RadioGroupItem value="prod" />
                  <span className="text-sm">生产环境</span>
                </label>
              </RadioGroup>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label>技术栈</Label>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">Select</span>
              </div>
              <Select onValueChange={(v) => toast.info(`选择了: ${v}`)} defaultValue="next">
                <SelectTrigger className="theme-input w-full">
                  <SelectValue placeholder="选择框架" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/70 bg-card p-4">
              <div className="flex items-center justify-between gap-3">
                <Label>功能开关</Label>
                <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground/80">Checkbox</span>
              </div>
              <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                <Checkbox defaultChecked />
                <span className="text-sm">启用操作日志</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                <Checkbox />
                <span className="text-sm">开启邮件通知</span>
              </label>
              <label className="flex items-center gap-3 rounded-xl border border-border/70 px-3 py-2">
                <Checkbox disabled />
                <span className="text-sm text-muted-foreground">归档模式下禁止修改权限</span>
              </label>
            </div>
          </CardContent>
        </Card>

        <Card className="h-full">
          <CardHeader>
            <CardTitle>交互控件</CardTitle>
            <CardDescription>展示开关、滑块以及表单提交区的组合方式。</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3">
              <div className="space-y-1">
                <Label htmlFor="notify-switch">系统通知</Label>
                <p className="text-xs text-muted-foreground">打开后将通过站内信推送异常告警。</p>
              </div>
              <Switch id="notify-switch" checked={switchOn} onCheckedChange={setSwitchOn} />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-border/70 bg-card px-4 py-3">
              <div className="space-y-1">
                <Label htmlFor="theme-switch">深色模式</Label>
                <p className="text-xs text-muted-foreground">用于验证表单在深浅主题下的状态一致性。</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-muted-foreground">{isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</span>
                <Switch
                  id="theme-switch"
                  checked={isDarkMode}
                  onCheckedChange={(checked) => {
                    const nextTheme = checked ? "dark" : "light";
                    setTheme(nextTheme);
                    toast.info(checked ? "深色模式" : "浅色模式");
                  }}
                />
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-border/70 bg-card px-4 py-4">
              <div className="flex items-center justify-between gap-3">
                <div className="space-y-1">
                  <Label>资源配额</Label>
                  <p className="text-xs text-muted-foreground">滑块用于调整租户容量、告警阈值或带宽上限。</p>
                </div>
                <Badge variant="outline" className="rounded-full">{sliderValue[0]}%</Badge>
              </div>
              <Slider value={sliderValue} onValueChange={(value) => setSliderValue(Array.isArray(value) ? [...value] : [value])} max={100} step={1} />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3 border-t border-border/70 pt-4">
              <Button variant="outline">取消</Button>
              <Button variant="secondary">保存草稿</Button>
              <Button onClick={() => toast.success("表单已提交")}>提交配置</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Feedback({ feedbackTab, setFeedbackTab, dialogOpen, setDialogOpen, sheetOpen, setSheetOpen, alertOpen, setAlertOpen }: { feedbackTab: string; setFeedbackTab: (value: string) => void; dialogOpen: boolean; setDialogOpen: (value: boolean) => void; sheetOpen: boolean; setSheetOpen: (value: boolean) => void; alertOpen: boolean; setAlertOpen: (value: boolean) => void }) {
  return (
    <div className="space-y-6">
      <Tabs value={feedbackTab} onValueChange={setFeedbackTab}>
        <TabsList variant="line">
          <TabsTrigger value="dialogs">对话框</TabsTrigger>
          <TabsTrigger value="sheets">抽屉</TabsTrigger>
          <TabsTrigger value="toasts">通知</TabsTrigger>
          <TabsTrigger value="popovers">气泡</TabsTrigger>
        </TabsList>
        <TabsContent value="dialogs" className="mt-4">
          <Card>
            <CardHeader><CardTitle>对话框</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger render={<Button>打开对话框</Button>} />
                <DialogContent>
                  <DialogHeader><DialogTitle>编辑资料</DialogTitle><DialogDescription>修改后点击保存</DialogDescription></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">姓名</Label><Input id="name" defaultValue="Pedro" className="theme-input col-span-3" /></div>
                  </div>
                  <DialogFooter><Button onClick={() => { setDialogOpen(false); toast.success("保存成功"); }}>保存</Button></DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger render={<Button variant="destructive">删除确认</Button>} />
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>确认删除?</AlertDialogTitle><AlertDialogDescription>此操作不可撤销</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel onClick={() => toast.info("已取消")}>取消</AlertDialogCancel><AlertDialogAction onClick={() => { setAlertOpen(false); toast.success("已删除"); }}>删除</AlertDialogAction></AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sheets" className="mt-4">
          <Card>
            <CardHeader><CardTitle>抽屉</CardTitle></CardHeader>
            <CardContent>
              <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
                <SheetTrigger render={<Button>打开抽屉</Button>} />
                <SheetContent>
                  <SheetHeader><SheetTitle>设置</SheetTitle><SheetDescription>管理您的设置</SheetDescription></SheetHeader>
                  <div className="space-y-4 py-4">
                    <div className="flex items-center justify-between"><Label>通知</Label><Switch /></div>
                    <div className="flex items-center justify-between"><Label>深色模式</Label><Switch /></div>
                  </div>
                  <SheetFooter><Button onClick={() => { setSheetOpen(false); toast.success("设置已保存"); }}>保存</Button></SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="toasts" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Toast 通知</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={() => showToast("success")} className="h-9 rounded-xl border border-emerald-200 bg-emerald-600 px-4 text-white hover:bg-emerald-700 hover:shadow-[0_12px_24px_color-mix(in_oklch,#059669_24%,transparent)]"><Check className="mr-2 h-4 w-4" />成功</Button>
              <Button onClick={() => showToast("error")} className="h-9 rounded-xl border border-rose-200 bg-rose-50 px-4 text-rose-700 hover:bg-rose-100 hover:text-rose-800"><X className="mr-2 h-4 w-4" />错误</Button>
              <Button onClick={() => showToast("warning")} className="h-9 rounded-xl border border-amber-200 bg-amber-50 px-4 text-amber-700 hover:bg-amber-100 hover:text-amber-800 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200"><AlertTriangle className="mr-2 h-4 w-4" />警告</Button>
              <Button onClick={() => showToast("info")} className="h-9 rounded-xl border border-blue-200 bg-blue-50 px-4 text-blue-700 hover:bg-blue-100 hover:text-blue-800 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200"><Info className="mr-2 h-4 w-4" />信息</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popovers" className="mt-4">
          <Card>
            <CardHeader><CardTitle>气泡卡片</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Popover><PopoverTrigger render={<Button variant="outline">打开气泡</Button>} /><PopoverContent className="w-80"><div className="grid gap-4"><div className="space-y-2"><h4 className="font-medium leading-none">尺寸</h4><p className="text-sm text-muted-foreground">选择产品尺寸</p></div><div className="grid gap-2"><div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="width">宽度</Label><Input id="width" defaultValue="100%" className="theme-input col-span-2 h-8" /></div></div></div></PopoverContent></Popover>
              <Tooltip><TooltipTrigger render={<Button variant="outline">悬停提示</Button>} /><TooltipContent><p>这是一个提示</p></TooltipContent></Tooltip>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Data({ dataTab, setDataTab, loading, handleLoading }: { dataTab: string; setDataTab: (value: string) => void; loading: boolean; handleLoading: () => void }) {
  const tableRows = [
    { id: "USR-1001", n: "张三", e: "zhang@example.com", r: "管理员", team: "平台组", status: "在线", updatedAt: "刚刚" },
    { id: "USR-1002", n: "李四", e: "li@example.com", r: "用户", team: "销售部", status: "离线", updatedAt: "5 分钟前" },
    { id: "USR-1003", n: "王五", e: "wang@example.com", r: "编辑", team: "运营部", status: "在线", updatedAt: "12 分钟前" },
    { id: "USR-1004", n: "赵六", e: "zhao@example.com", r: "审计员", team: "风控组", status: "在线", updatedAt: "18 分钟前" },
    { id: "USR-1005", n: "钱七", e: "qian@example.com", r: "用户", team: "客户成功", status: "离线", updatedAt: "27 分钟前" },
    { id: "USR-1006", n: "孙八", e: "sun@example.com", r: "编辑", team: "知识工程", status: "在线", updatedAt: "35 分钟前" },
    { id: "USR-1007", n: "周九", e: "zhou@example.com", r: "管理员", team: "平台组", status: "在线", updatedAt: "1 小时前" },
    { id: "USR-1008", n: "吴十", e: "wu@example.com", r: "用户", team: "市场部", status: "离线", updatedAt: "2 小时前" },
  ];
  const [keyword, setKeyword] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const filteredRows = tableRows.filter((row) => `${row.n} ${row.e} ${row.team} ${row.r}`.toLowerCase().includes(keyword.trim().toLowerCase()));
  const totalPages = Math.max(1, Math.ceil(filteredRows.length / pageSize));
  const safeCurrentPage = Math.min(currentPage, totalPages);
  const pageStart = (safeCurrentPage - 1) * pageSize;
  const pagedRows = filteredRows.slice(pageStart, pageStart + pageSize);
  const roleBadgeClassMap: Record<string, string> = {
    "管理员": "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-200",
    "审计员": "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-400/30 dark:bg-violet-400/10 dark:text-violet-200",
    "编辑": "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-400/30 dark:bg-amber-400/10 dark:text-amber-200",
    "用户": "border-slate-200 bg-slate-50 text-slate-700 dark:border-slate-400/30 dark:bg-slate-400/10 dark:text-slate-200",
  };

  return (
    <div className="space-y-6">
      <Tabs value={dataTab} onValueChange={setDataTab}>
        <TabsList variant="line">
          <TabsTrigger value="tables">表格</TabsTrigger>
          <TabsTrigger value="accordions">折叠</TabsTrigger>
          <TabsTrigger value="scroll">滚动</TabsTrigger>
          <TabsTrigger value="skeleton">骨架屏</TabsTrigger>
        </TabsList>
        <TabsContent value="tables" className="mt-4">
          <Card>
            <CardHeader>
              <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                <div className="space-y-1">
                  <CardTitle>数据表格</CardTitle>
                  <CardDescription>补齐后台列表页需要的检索、统计和分页，不再只是基础表格示例。</CardDescription>
                </div>
                <div className="grid gap-2 sm:grid-cols-3 lg:min-w-[420px]">
                  <div className="rounded-2xl border border-border/70 bg-card px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/75">总用户</p>
                    <p className="mt-1 text-base font-semibold">{tableRows.length}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-card px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/75">在线人数</p>
                    <p className="mt-1 text-base font-semibold theme-positive">{tableRows.filter((row) => row.status === "在线").length}</p>
                  </div>
                  <div className="rounded-2xl border border-border/70 bg-card px-4 py-3">
                    <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-muted-foreground/75">当前页</p>
                    <p className="mt-1 text-base font-semibold">{safeCurrentPage} / {totalPages}</p>
                  </div>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-col gap-3 rounded-2xl border border-border/70 bg-card p-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="relative w-full lg:max-w-sm">
                  <Search className="pointer-events-none absolute left-3 top-3.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="search"
                    value={keyword}
                    onChange={(event) => {
                      setKeyword(event.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder="按姓名、邮箱、部门搜索..."
                    className="theme-input pl-9"
                  />
                </div>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-full px-2.5">列表视图</Badge>
                  <Button variant="outline" className="h-9 rounded-xl px-4" onClick={() => toast.info("筛选面板")}>筛选条件</Button>
                  <Button className="h-9 rounded-xl px-4" onClick={() => toast.success("新建成员")}>新增成员</Button>
                </div>
              </div>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[220px]">成员</TableHead>
                    <TableHead>所属部门</TableHead>
                    <TableHead>角色</TableHead>
                    <TableHead>状态</TableHead>
                    <TableHead>最近更新</TableHead>
                    <TableHead className="pr-6 text-right">操作</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pagedRows.length > 0 ? (
                    pagedRows.map((u) => (
                      <TableRow key={u.id} className="cursor-pointer" onClick={() => toast.info(`选中: ${u.n}`)}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-9 w-9 border border-border/70">
                              <AvatarFallback>{u.n.slice(0, 1)}</AvatarFallback>
                            </Avatar>
                            <div className="space-y-0.5">
                              <p className="font-medium text-foreground">{u.n}</p>
                              <p className="text-xs text-muted-foreground">{u.e}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.team}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className={cn("rounded-full px-2.5", roleBadgeClassMap[u.r] ?? "border-border bg-muted/40 text-foreground")}>{u.r}</Badge>
                        </TableCell>
                        <TableCell>
                          <span className={cn("inline-flex items-center gap-2 text-sm", u.status === "在线" ? "theme-positive" : "text-muted-foreground")}>
                            <span className={cn("h-2 w-2 rounded-full", u.status === "在线" ? "bg-emerald-500" : "bg-slate-300")} />
                            {u.status}
                          </span>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{u.updatedAt}</TableCell>
                        <TableCell className="pr-6 text-right">
                          <div className="flex justify-end">
                            <Button variant="ghost" className="h-9 rounded-xl px-3.5" onClick={(event) => { event.stopPropagation(); toast.info(`编辑 ${u.n}`); }}>
                              <Edit className="mr-1 h-4 w-4" />
                              编辑
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={6} className="py-10 text-center text-muted-foreground">
                        没有匹配的成员，请调整搜索条件。
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
                <TableCaption>成员列表支持检索、行态反馈与分页浏览。</TableCaption>
              </Table>
              <div className="flex flex-col gap-3 border-t border-border/70 pt-4 lg:flex-row lg:items-center lg:justify-between">
                <p className="text-sm text-muted-foreground">
                  显示第 <span className="font-medium text-foreground">{filteredRows.length === 0 ? 0 : pageStart + 1}</span>
                  {" "}到{" "}
                  <span className="font-medium text-foreground">{Math.min(pageStart + pageSize, filteredRows.length)}</span>
                  {" "}条，共 <span className="font-medium text-foreground">{filteredRows.length}</span> 条
                </p>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon-sm" className="rounded-xl" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage(1)}>
                    <ChevronsLeft className="h-4 w-4" />
                  </Button>
                  <Button variant="outline" className="h-9 rounded-xl px-4" disabled={safeCurrentPage === 1} onClick={() => setCurrentPage((page) => Math.max(1, Math.min(totalPages, page - 1)))}>
                    上一页
                  </Button>
                  {Array.from({ length: totalPages }).map((_, index) => {
                    const page = index + 1;
                    const active = page === safeCurrentPage;

                    return (
                      <Button
                        key={page}
                        variant={active ? "default" : "outline"}
                        className="size-9 rounded-xl px-0"
                        onClick={() => setCurrentPage(page)}
                      >
                        {page}
                      </Button>
                    );
                  })}
                  <Button variant="outline" className="h-9 rounded-xl px-4" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage((page) => Math.min(totalPages, page + 1))}>
                    下一页
                  </Button>
                  <Button variant="outline" size="icon-sm" className="rounded-xl" disabled={safeCurrentPage === totalPages} onClick={() => setCurrentPage(totalPages)}>
                    <ChevronsRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="accordions" className="mt-4">
          <Card>
            <CardHeader><CardTitle>折叠面板</CardTitle></CardHeader>
            <CardContent>
              <Accordion defaultValue={["item-1"]}>
                <AccordionItem value="item-1"><AccordionTrigger>什么是 Shadcn/UI?</AccordionTrigger><AccordionContent>一个基于 Radix UI 和 Tailwind CSS 的组件库</AccordionContent></AccordionItem>
                <AccordionItem value="item-2"><AccordionTrigger>如何安装?</AccordionTrigger><AccordionContent>使用 npx shadcn-ui@latest init 初始化</AccordionContent></AccordionItem>
                <AccordionItem value="item-3"><AccordionTrigger>支持哪些框架?</AccordionTrigger><AccordionContent>支持 Next.js, React 等框架</AccordionContent></AccordionItem>
              </Accordion>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="scroll" className="mt-4">
          <Card>
            <CardHeader><CardTitle>滚动区域</CardTitle></CardHeader>
            <CardContent>
              <ScrollArea className="h-[200px] w-full rounded-xl border p-4">
                {Array.from({ length: 20 }).map((_, i) => (
                  <div key={i} className="flex cursor-pointer items-center gap-4 rounded-xl px-2 py-2 hover:bg-muted/50" onClick={() => toast.info(`项目 ${i + 1}`)}>
                    <Avatar className="h-8 w-8"><AvatarFallback>{i + 1}</AvatarFallback></Avatar>
                    <div className="flex-1"><p className="text-sm font-medium">项目 {i + 1}</p><p className="text-xs text-muted-foreground">描述文本</p></div>
                  </div>
                ))}
              </ScrollArea>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="skeleton" className="mt-4">
          <Card>
            <CardHeader><CardTitle>骨架屏</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-4"><Skeleton className="h-12 w-12 rounded-full" /><div className="space-y-2"><Skeleton className="h-4 w-[250px]" /><Skeleton className="h-4 w-[200px]" /></div></div>
              <div className="space-y-2"><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-full" /><Skeleton className="h-4 w-3/4" /></div>
              <Button onClick={handleLoading} disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />加载中</> : "加载数据"}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Nav() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>下拉菜单</CardTitle></CardHeader>
        <CardContent className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger render={<Button variant="outline">打开菜单</Button>} />
            <DropdownMenuContent className="w-56">
              <DropdownMenuGroup>
                <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.info("个人资料")}><User className="mr-2 h-4 w-4" />个人资料</DropdownMenuItem>
                <DropdownMenuItem onClick={() => toast.info("设置")}><Settings className="mr-2 h-4 w-4" />设置</DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => toast.success("已退出")} className="text-red-600"><X className="mr-2 h-4 w-4" />退出</DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>
      <Card>
        <CardHeader><CardTitle>分隔线</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2"><h4 className="font-medium">水平分隔</h4><Separator /></div>
          <div className="flex h-5 items-center space-x-4 text-sm"><span>首页</span><Separator orientation="vertical" /><span>产品</span><Separator orientation="vertical" /><span>关于</span></div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function Home() {
  const { resolvedTheme, setTheme } = useTheme();
  const [activeMenu, setActiveMenu] = useState("overview");
  const [activePalette, setActivePalette] = useState<ThemePalette>("base");
  const [activeModule, setActiveModule] = useState("system");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(false);
  const [generalTab, setGeneralTab] = useState("buttons");
  const [feedbackTab, setFeedbackTab] = useState("dialogs");
  const [dataTab, setDataTab] = useState("tables");

  useEffect(() => {
    const stored = normalizeStoredPalette(window.localStorage.getItem(PALETTE_STORAGE_KEY));
    if (stored) setActivePalette(stored);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => setProgress((p) => (p >= 100 ? 0 : p + 10)), 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.uiTheme = activePalette;
    window.localStorage.setItem(PALETTE_STORAGE_KEY, activePalette);
  }, [activePalette]);

  const isDarkMode = resolvedTheme === "dark";

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      toast.success("加载完成");
    }, 2000);
  };

  const toggleMode = () => {
    setTheme(isDarkMode ? "light" : "dark");
  };

  const contentMap: Record<string, React.ReactElement> = {
    overview: <Overview progress={progress} />,
    general: <General generalTab={generalTab} setGeneralTab={setGeneralTab} loading={loading} handleLoading={handleLoading} />,
    form: <Form switchOn={switchOn} setSwitchOn={setSwitchOn} isDarkMode={isDarkMode} setTheme={setTheme} sliderValue={sliderValue} setSliderValue={setSliderValue} />,
    feedback: <Feedback feedbackTab={feedbackTab} setFeedbackTab={setFeedbackTab} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />,
    data: <Data dataTab={dataTab} setDataTab={setDataTab} loading={loading} handleLoading={handleLoading} />,
    nav: <Nav />,
  };

  return (
    <div className="theme-shell flex min-h-screen bg-background text-foreground">
      <aside className={cn(collapsed ? "w-18" : "w-64", "theme-sidebar flex flex-col border-r transition-all duration-300")}>
        <div className="theme-sidebar-brand flex min-h-[60px] items-center justify-between border-b px-4 py-2">
          {!collapsed && (
            <div className="space-y-0.5">
              <span className="block text-lg font-semibold tracking-tight text-sidebar-foreground">UI Demo</span>
              <span className="block text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground/70">Playground</span>
            </div>
          )}
          <Button variant="ghost" size="icon" className="rounded-xl text-muted-foreground hover:bg-white/60 hover:text-foreground" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rotate-180" />}
          </Button>
        </div>
        <nav className="flex-1 space-y-1 px-3 py-2.5">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeMenu === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={cn(
                  "theme-nav-item relative flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all duration-200",
                  collapsed ? "justify-center px-0" : "pr-4 pl-4",
                  active ? "theme-nav-item-active" : ""
                )}
              >
                <Icon className="theme-nav-icon h-5 w-5 shrink-0 transition-colors" />
                {!collapsed && <span className="truncate font-medium tracking-[0.01em]">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="theme-header border-b border-border/70">
          <div className="flex min-h-[60px] items-center justify-between px-6">
            <nav className="flex h-[60px] items-stretch gap-10">
              {topModules.map((module) => {
                const active = module.id === activeModule;

                return (
                  <button
                    key={module.id}
                    type="button"
                    onClick={() => setActiveModule(module.id)}
                    className={cn(
                      "group relative inline-flex items-center text-[15px] tracking-[0.01em] transition-colors duration-200",
                      active
                        ? "text-foreground font-semibold"
                        : "text-muted-foreground/80 font-medium hover:text-foreground"
                    )}
                  >
                    {module.label}
                    <span className={cn(
                      "absolute bottom-[-1px] left-0 right-0 h-[2px] rounded-full transition-all duration-200",
                      active
                        ? "bg-[var(--app-highlight,var(--color-primary))] opacity-100"
                        : "bg-[var(--app-highlight,var(--color-primary))] opacity-0 scale-x-75 group-hover:opacity-40 group-hover:scale-x-100"
                    )} />
                  </button>
                );
              })}
            </nav>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="搜索..." className="theme-input w-64 pl-8" />
              </div>
              <Popover>
                <PopoverTrigger render={
                  <Button variant="ghost" size="icon" aria-label="主题设置">
                    <Palette className="h-5 w-5" />
                  </Button>
                } />
                <PopoverContent align="end" className="w-[min(92vw,720px)] rounded-3xl border-border/70 p-4 shadow-[0_18px_36px_color-mix(in_oklch,var(--app-highlight)_10%,transparent)]">
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <div className="space-y-1">
                      <h3 className="text-sm font-semibold">主题示意</h3>
                      <p className="text-xs text-muted-foreground">将主题切换收纳到辅助工具，不占用主导航层。</p>
                    </div>
                    <Badge variant="outline" className="rounded-full">Display Only</Badge>
                  </div>
                  <ThemeToolbar activePalette={activePalette} setActivePalette={setActivePalette} isDarkMode={isDarkMode} toggleMode={toggleMode} />
                </PopoverContent>
              </Popover>
              <Button variant="ghost" size="icon" onClick={() => toast.info("通知")}>
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger render={
                  <button type="button" className="rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring">
                    <Avatar className="h-8 w-8 cursor-pointer">
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </button>
                } />
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuGroup>
                    <DropdownMenuLabel>我的账户</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => toast.info("个人资料")}><User className="mr-2 h-4 w-4" />个人资料</DropdownMenuItem>
                    <DropdownMenuItem onClick={() => toast.info("设置")}><Settings className="mr-2 h-4 w-4" />设置</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => toast.success("已退出")} className="text-red-600"><X className="mr-2 h-4 w-4" />退出</DropdownMenuItem>
                  </DropdownMenuGroup>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <div className="space-y-1">
              <h2 className="text-xl font-semibold">{menuItems.find((m) => m.id === activeMenu)?.label}</h2>
              <p className="text-sm text-muted-foreground">左侧负责当前模块内页面导航，内容区专注展示组件与规范。</p>
            </div>
            {contentMap[activeMenu]}
          </div>
        </div>
      </main>
    </div>
  );
}
