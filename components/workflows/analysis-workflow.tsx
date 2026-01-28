"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  ArrowLeft,
  FileText,
  CheckCircle,
  Shield,
  Lightbulb,
  AlertTriangle,
  Scale,
  BookOpen,
  Loader2,
} from "lucide-react";

interface AnalysisWorkflowProps {
  fileName: string;
  onBack: () => void;
}

interface AnalysisSection {
  title: string;
  icon: React.ReactNode;
  content: string;
  items?: string[];
}

export function AnalysisWorkflow({ fileName, onBack }: AnalysisWorkflowProps) {
  const [isAnalyzing, setIsAnalyzing] = useState(true);
  const [progress, setProgress] = useState(0);

  // 模拟解析过程
  useEffect(() => {
    if (isAnalyzing) {
      const interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setIsAnalyzing(false);
            return 100;
          }
          return prev + 2;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isAnalyzing]);

  const analysisSections: AnalysisSection[] = [
    {
      title: "权利要求解读",
      icon: <Scale className="h-5 w-5 text-blue-500" />,
      content: "本专利包含3项独立权利要求和7项从属权利要求。",
      items: [
        "权利要求1：限定了一种基于深度学习的图像处理方法，核心步骤包括图像预处理、特征提取和分类。",
        "权利要求5：进一步限定了特征提取的具体网络结构，采用了改进的ResNet架构。",
        "保护范围核心：在于特征提取模块中的注意力机制实现方式。",
      ],
    },
    {
      title: "技术方案分析",
      icon: <BookOpen className="h-5 w-5 text-emerald-500" />,
      content: "该方案主要解决现有图像识别在低光照环境下的准确率问题。",
      items: [
        "核心技术：引入了自适应光照补偿模块。",
        "技术路线：光照检测 -> 参数自适应 -> 图像增强 -> 识别。",
        "优势：在低光照环境下识别率提升15%。",
      ],
    },
    {
      title: "创新点识别",
      icon: <Lightbulb className="h-5 w-5 text-amber-500" />,
      content: "相对于现有技术（如CN10xxxxxx），本方案的创新点在于：",
      items: [
        "提出了基于直方图均衡化的动态光照补偿算法。",
        "设计了轻量级的特征提取网络，适合移动端部署。",
      ],
    },
    {
      title: "保护范围评估",
      icon: <Shield className="h-5 w-5 text-indigo-500" />,
      content: "保护范围较宽，覆盖了方法、装置及存储介质。",
      items: [
        "独立权利要求并未限定具体的硬件设备，保护范围延伸至各类图像处理终端。",
        "但是，对于“光照补偿”的具体算法步骤限定较细，可能存在规避空间。",
      ],
    },
    {
      title: "规避设计建议",
      icon: <AlertTriangle className="h-5 w-5 text-rose-500" />,
      content: "针对权利要求1的特征，建议从以下角度考虑规避：",
      items: [
        "替换光照补偿算法：采用基于Retinex理论的算法替代直方图均衡化。",
        "改变处理流程：将光照补偿步骤后置，或者与特征提取并行处理。",
      ],
    },
  ];

  return (
    <div className="flex h-screen flex-col bg-background">
      {/* Header */}
      <header className="flex items-center justify-between border-b border-border bg-card px-6 py-4">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={onBack}
            className="h-9 w-9"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex items-center gap-3">
            <FileText className="h-5 w-5 text-primary" />
            <div>
              <h2 className="text-lg font-semibold text-foreground">
                专利深度解析
              </h2>
              <p className="text-xs text-muted-foreground">{fileName}</p>
            </div>
          </div>
        </div>
      </header>

      {/* Content */}
      <main className="flex-1 overflow-y-auto p-6">
        <div className="mx-auto max-w-4xl space-y-6">
          {isAnalyzing ? (
            /* Loading State */
            <div className="flex h-[60vh] flex-col items-center justify-center space-y-6">
              <div className="relative h-32 w-32">
                <div className="absolute inset-0 animate-spin rounded-full border-4 border-primary/20 border-t-primary" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-xl font-bold text-primary">
                    {progress}%
                  </span>
                </div>
              </div>
              <div className="text-center space-y-2">
                <h3 className="text-xl font-semibold text-foreground">
                  正在深度解析专利文档...
                </h3>
                <p className="text-muted-foreground">
                  AI正在阅读文档、分析权利要求并提取技术特征
                </p>
              </div>
            </div>
          ) : (
            /* Analysis Results */
            <div className="space-y-6 animate-in fade-in duration-500 slide-in-from-bottom-4">
              <div className="rounded-lg bg-primary/5 p-4 border border-primary/20">
                <div className="flex items-center gap-2 text-primary mb-2">
                  <CheckCircle className="h-5 w-5" />
                  <h3 className="font-semibold">解析完成</h3>
                </div>
                <p className="text-sm text-muted-foreground">
                  已完成对《{fileName}》的深度解析，生成了5个维度的分析报告。
                </p>
              </div>

              <div className="grid gap-6">
                {analysisSections.map((section, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-border bg-card p-6 shadow-sm transition-all hover:shadow-md"
                  >
                    <div className="mb-4 flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent">
                        {section.icon}
                      </div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {section.title}
                      </h3>
                    </div>

                    <div className="pl-[52px]">
                      <p className="mb-4 text-sm text-foreground/80 leading-relaxed">
                        {section.content}
                      </p>

                      {section.items && (
                        <ul className="space-y-2">
                          {section.items.map((item, i) => (
                            <li
                              key={i}
                              className="flex items-start gap-2 text-sm text-muted-foreground"
                            >
                              <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary/60" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex justify-center pt-8 pb-4">
                <Button onClick={onBack} variant="outline" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  返回首页
                </Button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
