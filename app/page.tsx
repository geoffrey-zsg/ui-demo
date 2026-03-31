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
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
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
import { AlertTriangle, Bell, Check, CheckCircle2, ChevronRight, Component, Edit, FormInput, Info, LayoutDashboard, Layers, Loader2, Menu, MessageSquare, Moon, Palette, Search, Settings, Star, Sun, User, X } from "lucide-react";

type ThemePalette = "base" | "enterprise" | "lagoon" | "mist";

const PALETTE_STORAGE_KEY = "ui-demo-theme-palette";

const menuItems = [
  { id: "overview", label: "概览", icon: LayoutDashboard },
  { id: "general", label: "通用", icon: Component },
  { id: "form", label: "表单", icon: FormInput },
  { id: "feedback", label: "反馈", icon: MessageSquare },
  { id: "data", label: "数据", icon: Layers },
  { id: "nav", label: "导航", icon: Menu },
] as const;

const paletteOptions: {
  id: ThemePalette;
  label: string;
  description: string;
  chips: string[];
}[] = [
  { id: "base", label: "经典中性", description: "延续当前默认配色，干净克制，适合作为标准基线。", chips: ["#171717", "#6b7280", "#d4d4d8", "#ffffff"] },
  { id: "enterprise", label: "企业蓝灰", description: "蓝灰主导的后台风格，专业稳重，信息层级清晰。", chips: ["#0f62fe", "#0043ce", "#edf5ff", "#c6c6c6"] },
  { id: "lagoon", label: "清湾青色", description: "青绿色轻量点缀，观感更轻盈，适合现代数据界面。", chips: ["#1f9bb6", "#70d6b2", "#dff7f4", "#1f3344"] },
  { id: "mist", label: "云雾青灰", description: "青灰低饱和配色，冷静清爽，适合企业级知识与数据平台。", chips: ["#3A7E8C", "#6FA8B2", "#EAF4F5", "#234852"] },
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
  if (value === "ember") {
    return "mist";
  }

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
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="buttons">按钮</TabsTrigger>
          <TabsTrigger value="cards">卡片</TabsTrigger>
          <TabsTrigger value="badges">徽章</TabsTrigger>
          <TabsTrigger value="avatars">头像</TabsTrigger>
        </TabsList>
        <TabsContent value="buttons" className="mt-4">
          <Card>
            <CardHeader><CardTitle>按钮样式</CardTitle><CardDescription>点击按钮查看 Toast 反馈</CardDescription></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Button onClick={() => showToast("success")}>默认</Button>
              <Button variant="secondary" onClick={() => showToast("info")}>次要</Button>
              <Button variant="outline" onClick={() => showToast("warning")}>边框</Button>
              <Button variant="destructive" onClick={() => showToast("error")}>危险</Button>
              <Button variant="ghost">幽灵</Button>
              <Button variant="link">链接</Button>
              <Button disabled>禁用</Button>
              <Button size="sm">小</Button>
              <Button size="lg">大</Button>
              <Button onClick={handleLoading} disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin" />加载中</> : "加载"}</Button>
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

function Form({ formTab, setFormTab, switchOn, setSwitchOn, isDarkMode, setTheme, sliderValue, setSliderValue }: { formTab: string; setFormTab: (value: string) => void; switchOn: boolean; setSwitchOn: (value: boolean) => void; isDarkMode: boolean; setTheme: (theme: string) => void; sliderValue: number[]; setSliderValue: (value: number[]) => void }) {
  return (
    <div className="space-y-6">
      <Tabs value={formTab} onValueChange={setFormTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="inputs">输入框</TabsTrigger>
          <TabsTrigger value="selects">选择器</TabsTrigger>
          <TabsTrigger value="switches">开关</TabsTrigger>
          <TabsTrigger value="sliders">滑块</TabsTrigger>
        </TabsList>
        <TabsContent value="inputs" className="mt-4 space-y-4">
          <Card>
            <CardHeader><CardTitle>文本输入</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="grid w-full max-w-sm items-center gap-1.5"><Label htmlFor="email">邮箱</Label><Input type="email" id="email" placeholder="Email" className="theme-input" /></div>
              <div className="grid w-full max-w-sm items-center gap-1.5"><Label htmlFor="pwd">密码</Label><Input type="password" id="pwd" placeholder="Password" className="theme-input" /></div>
              <div className="grid w-full gap-1.5"><Label htmlFor="msg">消息</Label><Textarea placeholder="输入内容..." id="msg" className="theme-input" /></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="selects" className="mt-4">
          <Card>
            <CardHeader><CardTitle>下拉选择</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={(v) => toast.info(`选择了: ${v}`)}>
                <SelectTrigger className="theme-input w-[280px]"><SelectValue placeholder="选择框架" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="next">Next.js</SelectItem>
                  <SelectItem value="react">React</SelectItem>
                  <SelectItem value="vue">Vue</SelectItem>
                  <SelectItem value="angular">Angular</SelectItem>
                </SelectContent>
              </Select>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="switches" className="mt-4">
          <Card>
            <CardHeader><CardTitle>开关组件</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center space-x-2">
                <Switch id="airplane" checked={switchOn} onCheckedChange={setSwitchOn} />
                <Label htmlFor="airplane">{switchOn ? "开启" : "关闭"}</Label>
              </div>
              <div className="flex items-center space-x-2">
                <Switch
                  id="dark"
                  checked={isDarkMode}
                  onCheckedChange={(checked) => {
                    const nextTheme = checked ? "dark" : "light";
                    setTheme(nextTheme);
                    toast.info(checked ? "深色模式" : "浅色模式");
                  }}
                />
                <Label htmlFor="dark">{isDarkMode ? <Moon className="h-4 w-4" /> : <Sun className="h-4 w-4" />}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sliders" className="mt-4">
          <Card>
            <CardHeader><CardTitle>滑块</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2"><div className="flex justify-between"><Label>音量</Label><span>{sliderValue[0]}%</span></div>
                <Slider value={sliderValue} onValueChange={(value) => setSliderValue(Array.isArray(value) ? [...value] : [value])} max={100} step={1} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Feedback({ feedbackTab, setFeedbackTab, dialogOpen, setDialogOpen, sheetOpen, setSheetOpen, alertOpen, setAlertOpen }: { feedbackTab: string; setFeedbackTab: (value: string) => void; dialogOpen: boolean; setDialogOpen: (value: boolean) => void; sheetOpen: boolean; setSheetOpen: (value: boolean) => void; alertOpen: boolean; setAlertOpen: (value: boolean) => void }) {
  return (
    <div className="space-y-6">
      <Tabs value={feedbackTab} onValueChange={setFeedbackTab}>
        <TabsList className="grid w-full grid-cols-4">
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
                <SheetTrigger><Button>打开抽屉</Button></SheetTrigger>
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
              <Button onClick={() => showToast("success")} className="bg-green-600 text-white hover:bg-green-700"><Check className="mr-2 h-4 w-4" />成功</Button>
              <Button onClick={() => showToast("error")} variant="destructive"><X className="mr-2 h-4 w-4" />错误</Button>
              <Button onClick={() => showToast("warning")} variant="outline" className="border-yellow-500 text-yellow-700 hover:bg-yellow-500/10 dark:text-yellow-300"><AlertTriangle className="mr-2 h-4 w-4" />警告</Button>
              <Button onClick={() => showToast("info")} variant="secondary"><Info className="mr-2 h-4 w-4" />信息</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popovers" className="mt-4">
          <Card>
            <CardHeader><CardTitle>气泡卡片</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4">
              <Popover><PopoverTrigger><Button variant="outline">打开气泡</Button></PopoverTrigger><PopoverContent className="w-80"><div className="grid gap-4"><div className="space-y-2"><h4 className="font-medium leading-none">尺寸</h4><p className="text-sm text-muted-foreground">选择产品尺寸</p></div><div className="grid gap-2"><div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="width">宽度</Label><Input id="width" defaultValue="100%" className="theme-input col-span-2 h-8" /></div></div></div></PopoverContent></Popover>
              <Tooltip><TooltipTrigger><Button variant="outline">悬停提示</Button></TooltipTrigger><TooltipContent><p>这是一个提示</p></TooltipContent></Tooltip>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

function Data({ dataTab, setDataTab, loading, handleLoading }: { dataTab: string; setDataTab: (value: string) => void; loading: boolean; handleLoading: () => void }) {
  return (
    <div className="space-y-6">
      <Tabs value={dataTab} onValueChange={setDataTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="tables">表格</TabsTrigger>
          <TabsTrigger value="accordions">折叠</TabsTrigger>
          <TabsTrigger value="scroll">滚动</TabsTrigger>
          <TabsTrigger value="skeleton">骨架屏</TabsTrigger>
        </TabsList>
        <TabsContent value="tables" className="mt-4">
          <Card>
            <CardHeader><CardTitle>数据表格</CardTitle></CardHeader>
            <CardContent>
              <Table>
                <TableCaption>用户列表</TableCaption>
                <TableHeader><TableRow><TableHead>姓名</TableHead><TableHead>邮箱</TableHead><TableHead>角色</TableHead><TableHead>操作</TableHead></TableRow></TableHeader>
                <TableBody>
                  {[{ n: "张三", e: "zhang@example.com", r: "管理员" }, { n: "李四", e: "li@example.com", r: "用户" }, { n: "王五", e: "wang@example.com", r: "编辑" }].map((u, i) => (
                    <TableRow key={i} className="cursor-pointer hover:bg-muted/50" onClick={() => toast.info(`选中: ${u.n}`)}>
                      <TableCell className="font-medium">{u.n}</TableCell><TableCell>{u.e}</TableCell><TableCell><Badge variant="outline">{u.r}</Badge></TableCell>
                      <TableCell><Button size="sm" variant="ghost"><Edit className="h-4 w-4" /></Button></TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
            <DropdownMenuTrigger><Button variant="outline">打开菜单</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.info("个人资料")}><User className="mr-2 h-4 w-4" />个人资料</DropdownMenuItem>
              <DropdownMenuItem onClick={() => toast.info("设置")}><Settings className="mr-2 h-4 w-4" />设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => toast.success("已退出")} className="text-red-600"><X className="mr-2 h-4 w-4" />退出</DropdownMenuItem>
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
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(false);
  const [generalTab, setGeneralTab] = useState("buttons");
  const [formTab, setFormTab] = useState("inputs");
  const [feedbackTab, setFeedbackTab] = useState("dialogs");
  const [dataTab, setDataTab] = useState("tables");

  useEffect(() => {
    const stored = window.localStorage.getItem(PALETTE_STORAGE_KEY);
    const normalized = normalizeStoredPalette(stored);
    if (normalized) {
      setActivePalette(normalized);
    }
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
  const currentPalette = paletteOptions.find((option) => option.id === activePalette) ?? paletteOptions[0];

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
    form: <Form formTab={formTab} setFormTab={setFormTab} switchOn={switchOn} setSwitchOn={setSwitchOn} isDarkMode={isDarkMode} setTheme={setTheme} sliderValue={sliderValue} setSliderValue={setSliderValue} />,
    feedback: <Feedback feedbackTab={feedbackTab} setFeedbackTab={setFeedbackTab} dialogOpen={dialogOpen} setDialogOpen={setDialogOpen} sheetOpen={sheetOpen} setSheetOpen={setSheetOpen} alertOpen={alertOpen} setAlertOpen={setAlertOpen} />,
    data: <Data dataTab={dataTab} setDataTab={setDataTab} loading={loading} handleLoading={handleLoading} />,
    nav: <Nav />,
  };

  return (
    <div className="theme-shell flex min-h-screen bg-background text-foreground">
      <aside className={cn(collapsed ? "w-20" : "w-72", "theme-sidebar flex flex-col border-r transition-all duration-300")}>
        <div className="flex items-center justify-between border-b px-5 py-4">
          {!collapsed && (
            <div className="space-y-1">
              <span className="block text-lg font-bold tracking-tight">UI Demo</span>
              <span className="block text-xs text-muted-foreground">Palette Playground</span>
            </div>
          )}
          <Button variant="ghost" size="icon" onClick={() => setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rotate-180" />}
          </Button>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const active = activeMenu === item.id;

            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left text-sm transition-all",
                  active ? "theme-selected-surface shadow-sm ring-1" : "hover:bg-muted/70"
                )}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {!collapsed && <span className="truncate font-medium">{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      <main className="flex min-w-0 flex-1 flex-col">
        <header className="theme-header border-b border-border/70 px-6 py-3">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <h1 className="text-xl font-semibold">{menuItems.find((m) => m.id === activeMenu)?.label}</h1>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input type="search" placeholder="搜索..." className="theme-input w-64 pl-8" />
              </div>
              <Button variant="ghost" size="icon" onClick={() => toast.info("通知")}>
                <Bell className="h-5 w-5" />
              </Button>
              <Avatar className="h-8 w-8 cursor-pointer" onClick={() => toast.info("个人中心")}>
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto">
          <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
            <Card className="theme-accent-panel">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="rounded-full border-primary/20 bg-primary/10 text-primary">
                    <Palette className="mr-1 h-3.5 w-3.5" />
                    主题切换
                  </Badge>
                  <Badge variant="outline" className="rounded-full">{currentPalette.label}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <ThemeToolbar activePalette={activePalette} setActivePalette={setActivePalette} isDarkMode={isDarkMode} toggleMode={toggleMode} />
              </CardContent>
            </Card>
            {contentMap[activeMenu]}
          </div>
        </div>
      </main>
    </div>
  );
}
