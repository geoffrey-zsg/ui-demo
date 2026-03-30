"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
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
import { toast, Toaster } from "sonner";
import { LayoutDashboard, Component, FormInput, Layers, MessageSquare, Menu, Bell, Search, ChevronRight, User, Star, CheckCircle2, Loader2, Plus, Trash2, Edit, Download, Upload, Settings, Moon, Sun, Info, AlertTriangle, X, Check, MoreHorizontal, Eye, Filter, Heart, Share2, Mail, Phone, MapPin } from "lucide-react";

const menuItems = [
  { id: "overview", label: "概览", icon: LayoutDashboard },
  { id: "general", label: "通用", icon: Component },
  { id: "form", label: "表单", icon: FormInput },
  { id: "feedback", label: "反馈", icon: MessageSquare },
  { id: "data", label: "数据", icon: Layers },
  { id: "nav", label: "导航", icon: Menu },
];

export default function Home() {
  const [activeMenu, setActiveMenu] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [darkMode, setDarkMode] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const [sliderValue, setSliderValue] = useState([50]);
  const [switchOn, setSwitchOn] = useState(false);
  const [checkedItems, setCheckedItems] = useState<string[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setProgress(p => p >= 100 ? 0 : p + 10), 1000);
    return () => clearInterval(timer);
  }, []);

  const showToast = (type: string) => {
    const msgs: Record<string, {t:string;d:string}> = {
      success: {t:"成功", d:"操作已完成"},
      error: {t:"错误", d:"操作失败"},
      warning: {t:"警告", d:"请注意"},
      info: {t:"提示", d:"通知消息"}
    };
    toast[msgs[type] ? type : "info"](msgs[type]?.t || type, { description: msgs[type]?.d || "" });
  };

  const handleLoading = () => { setLoading(true); setTimeout(() => { setLoading(false); toast.success("加载完成"); }, 2000); };

  const toggleCheck = (id: string) => setCheckedItems(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);

  const Overview = () => (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-4">
        {[{t:"访问量",v:"45,231",i:LayoutDashboard},{t:"用户",v:"2,350",i:User},{t:"销售",v:"¥12,234",i:Star},{t:"订单",v:"573",i:CheckCircle2}].map((s,i)=> (
          <Card key={i} className="hover:shadow-lg transition-shadow cursor-pointer" onClick={()=>showToast("info")}>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium">{s.t}</CardTitle>
              <s.i className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{s.v}</div>
              <p className="text-xs text-green-600">+{10+i*5}% 较上月</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader><CardTitle>任务进度</CardTitle></CardHeader>
          <CardContent className="space-y-4">
            {[{l:"数据同步",v:progress},{l:"文件上传",v:(progress+30)%100},{l:"系统备份",v:(progress+60)%100}].map((t,i)=> (
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
              {["创建项目","更新配置","删除文件","导出报表","上传资源"].map((a,i)=> (
                <div key={i} className="flex items-center gap-4 py-2 hover:bg-muted/50 rounded px-2 cursor-pointer transition-colors" onClick={()=>toast.info(a)}>
                  <div className={`w-2 h-2 rounded-full ${["bg-green-500","bg-blue-500","bg-red-500","bg-purple-500","bg-orange-500"][i]}`} />
                  <div className="flex-1"><p className="text-sm font-medium">{a}</p><p className="text-xs text-muted-foreground">{i+1}小时前</p></div>
                  <ChevronRight className="h-4 w-4 text-muted-foreground" />
                </div>
              ))}
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );

  const General = () => {
    const [tab, setTab] = useState("buttons");
    return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
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
              <Button onClick={()=>showToast("success")}>默认</Button>
              <Button variant="secondary" onClick={()=>showToast("info")}>次要</Button>
              <Button variant="outline" onClick={()=>showToast("warning")}>边框</Button>
              <Button variant="destructive" onClick={()=>showToast("error")}>危险</Button>
              <Button variant="ghost">幽灵</Button>
              <Button variant="link">链接</Button>
              <Button disabled>禁用</Button>
              <Button size="sm">小</Button>
              <Button size="lg">大</Button>
              <Button onClick={handleLoading} disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>加载中</> : "加载"}</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="cards" className="mt-4">
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-lg transition-shadow">
              <CardHeader><CardTitle>基础卡片</CardTitle><CardDescription>卡片描述</CardDescription></CardHeader>
              <CardContent><p>卡片内容区域</p></CardContent>
              <CardFooter><Button size="sm">操作</Button></CardFooter>
            </Card>
            <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950 dark:to-indigo-950">
              <CardHeader><CardTitle>渐变卡片</CardTitle></CardHeader>
              <CardContent><Badge>Featured</Badge></CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between"><CardTitle>统计</CardTitle><Star className="h-4 w-4 text-yellow-500"/></CardHeader>
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
              {["新功能","热门","推荐"].map((t,i)=> <Badge key={i} className="cursor-pointer hover:scale-105 transition-transform" onClick={()=>toast.info(t)}>{t}</Badge>)}
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="avatars" className="mt-4">
          <Card>
            <CardHeader><CardTitle>头像组件</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-4 items-center">
              <Avatar className="cursor-pointer hover:ring-2 ring-primary transition-all" onClick={()=>toast.success("点击了头像")}>
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
  };

  const Form = () => {
    const [tab, setTab] = useState("inputs");
    return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
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
              <div className="grid w-full max-w-sm items-center gap-1.5"><Label htmlFor="email">邮箱</Label><Input type="email" id="email" placeholder="Email" /></div>
              <div className="grid w-full max-w-sm items-center gap-1.5"><Label htmlFor="pwd">密码</Label><Input type="password" id="pwd" placeholder="Password" /></div>
              <div className="grid w-full gap-1.5"><Label htmlFor="msg">消息</Label><Textarea placeholder="输入内容..." id="msg" /></div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="selects" className="mt-4">
          <Card>
            <CardHeader><CardTitle>下拉选择</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Select onValueChange={(v)=>toast.info(`选择了: ${v}`)}>
                <SelectTrigger className="w-[280px]"><SelectValue placeholder="选择框架" /></SelectTrigger>
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
                <Switch id="dark" checked={darkMode} onCheckedChange={(c)=>{setDarkMode(c); toast.info(c?"深色模式":"浅色模式");}} />
                <Label htmlFor="dark">{darkMode ? <Moon className="h-4 w-4"/> : <Sun className="h-4 w-4"/>}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="sliders" className="mt-4">
          <Card>
            <CardHeader><CardTitle>滑块</CardTitle></CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2"><div className="flex justify-between"><Label>音量</Label><span>{sliderValue[0]}%</span></div>
                <Slider value={sliderValue} onValueChange={setSliderValue} max={100} step={1} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  };

  const Feedback = () => {
    const [tab, setTab] = useState("dialogs");
    return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="dialogs">对话框</TabsTrigger>
          <TabsTrigger value="sheets">抽屉</TabsTrigger>
          <TabsTrigger value="toasts">通知</TabsTrigger>
          <TabsTrigger value="popovers">气泡</TabsTrigger>
        </TabsList>
        <TabsContent value="dialogs" className="mt-4">
          <Card>
            <CardHeader><CardTitle>对话框</CardTitle></CardHeader>
            <CardContent className="flex gap-4">
              <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger><Button>打开对话框</Button></DialogTrigger>
                <DialogContent>
                  <DialogHeader><DialogTitle>编辑资料</DialogTitle><DialogDescription>修改后点击保存</DialogDescription></DialogHeader>
                  <div className="grid gap-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4"><Label htmlFor="name" className="text-right">姓名</Label><Input id="name" defaultValue="Pedro" className="col-span-3" /></div>
                  </div>
                  <DialogFooter><Button onClick={()=>{setDialogOpen(false); toast.success("保存成功");}}>保存</Button></DialogFooter>
                </DialogContent>
              </Dialog>
              <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                <AlertDialogTrigger><Button variant="destructive">删除确认</Button></AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader><AlertDialogTitle>确认删除?</AlertDialogTitle><AlertDialogDescription>此操作不可撤销</AlertDialogDescription></AlertDialogHeader>
                  <AlertDialogFooter><AlertDialogCancel onClick={()=>toast.info("已取消")}>取消</AlertDialogCancel><AlertDialogAction onClick={()=>{setAlertOpen(false); toast.success("已删除");}}>删除</AlertDialogAction></AlertDialogFooter>
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
                  <div className="py-4 space-y-4">
                    <div className="flex items-center justify-between"><Label>通知</Label><Switch /></div>
                    <div className="flex items-center justify-between"><Label>深色模式</Label><Switch /></div>
                  </div>
                  <SheetFooter><Button onClick={()=>{setSheetOpen(false); toast.success("设置已保存");}}>保存</Button></SheetFooter>
                </SheetContent>
              </Sheet>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="toasts" className="mt-4">
          <Card>
            <CardHeader><CardTitle>Toast 通知</CardTitle></CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              <Button onClick={()=>showToast("success")} className="bg-green-600"><Check className="mr-2 h-4 w-4"/>成功</Button>
              <Button onClick={()=>showToast("error")} variant="destructive"><X className="mr-2 h-4 w-4"/>错误</Button>
              <Button onClick={()=>showToast("warning")} variant="outline" className="border-yellow-500 text-yellow-600"><AlertTriangle className="mr-2 h-4 w-4"/>警告</Button>
              <Button onClick={()=>showToast("info")} variant="secondary"><Info className="mr-2 h-4 w-4"/>信息</Button>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="popovers" className="mt-4">
          <Card>
            <CardHeader><CardTitle>气泡卡片</CardTitle></CardHeader>
            <CardContent className="flex gap-4">
              <Popover><PopoverTrigger><Button variant="outline">打开气泡</Button></PopoverTrigger><PopoverContent className="w-80"><div className="grid gap-4"><div className="space-y-2"><h4 className="font-medium leading-none">尺寸</h4><p className="text-sm text-muted-foreground">选择产品尺寸</p></div><div className="grid gap-2"><div className="grid grid-cols-3 items-center gap-4"><Label htmlFor="width">宽度</Label><Input id="width" defaultValue="100%" className="col-span-2 h-8" /></div></div></div></PopoverContent></Popover>
              <Tooltip><TooltipTrigger><Button variant="outline">悬停提示</Button></TooltipTrigger><TooltipContent><p>这是一个提示</p></TooltipContent></Tooltip>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  };

  const Data = () => {
    const [tab, setTab] = useState("tables");
    return (
    <div className="space-y-6">
      <Tabs value={tab} onValueChange={(v) => setTab(v)}>
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
                  {[{n:"张三",e:"zhang@example.com",r:"管理员"},{n:"李四",e:"li@example.com",r:"用户"},{n:"王五",e:"wang@example.com",r:"编辑"}].map((u,i)=> (
                    <TableRow key={i} className="cursor-pointer hover:bg-muted/50" onClick={()=>toast.info(`选中: ${u.n}`)}>
                      <TableCell className="font-medium">{u.n}</TableCell><TableCell>{u.e}</TableCell><TableCell><Badge variant="outline">{u.r}</Badge></TableCell>
                      <TableCell><Button size="sm" variant="ghost"><Edit className="h-4 w-4"/></Button></TableCell>
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
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                {Array.from({length:20}).map((_,i)=> (
                  <div key={i} className="flex items-center gap-4 py-2 hover:bg-muted/50 rounded px-2 cursor-pointer" onClick={()=>toast.info(`项目 ${i+1}`)}>
                    <Avatar className="h-8 w-8"><AvatarFallback>{i+1}</AvatarFallback></Avatar>
                    <div className="flex-1"><p className="text-sm font-medium">项目 {i+1}</p><p className="text-xs text-muted-foreground">描述文本</p></div>
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
              <Button onClick={handleLoading} disabled={loading}>{loading ? <><Loader2 className="mr-2 h-4 w-4 animate-spin"/>加载中</> : "加载数据"}</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
  };

  const Nav = () => (
    <div className="space-y-6">
      <Card>
        <CardHeader><CardTitle>下拉菜单</CardTitle></CardHeader>
        <CardContent className="flex gap-4">
          <DropdownMenu>
            <DropdownMenuTrigger><Button variant="outline">打开菜单</Button></DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
              <DropdownMenuLabel>我的账户</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>toast.info("个人资料")}><User className="mr-2 h-4 w-4"/>个人资料</DropdownMenuItem>
              <DropdownMenuItem onClick={()=>toast.info("设置")}><Settings className="mr-2 h-4 w-4"/>设置</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={()=>toast.success("已退出")} className="text-red-600"><X className="mr-2 h-4 w-4"/>退出</DropdownMenuItem>
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

  const contentMap: Record<string, React.ReactElement> = {
    overview: <Overview />,
    general: <General />,
    form: <Form />,
    feedback: <Feedback />,
    data: <Data />,
    nav: <Nav />,
  };

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className={`${collapsed ? "w-16" : "w-64"} bg-card border-r transition-all duration-300 flex flex-col`}>
        <div className="h-14 flex items-center justify-between px-4 border-b">
          {!collapsed && <span className="font-bold text-lg">UI Demo</span>}
          <Button variant="ghost" size="icon" onClick={()=>setCollapsed(!collapsed)}>
            {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronRight className="h-4 w-4 rotate-180" />}
          </Button>
        </div>
        <nav className="flex-1 p-2 space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveMenu(item.id)}
                className={`w-full flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                  activeMenu === item.id ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                }`}
              >
                <Icon className="h-5 w-5" />
                {!collapsed && <span>{item.label}</span>}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-14 border-b bg-card flex items-center justify-between px-6">
          <div className="flex items-center gap-4">
            <h1 className="text-xl font-semibold">{menuItems.find(m => m.id === activeMenu)?.label}</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input type="search" placeholder="搜索..." className="w-64 pl-8" />
            </div>
            <Button variant="ghost" size="icon" onClick={()=>toast.info("通知")}>
              <Bell className="h-5 w-5" />
            </Button>
            <Avatar className="h-8 w-8 cursor-pointer" onClick={()=>toast.info("个人中心")}>
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6 overflow-auto">
          {contentMap[activeMenu]}
        </div>
      </main>

      <Toaster position="top-right" />
    </div>
  );
}
