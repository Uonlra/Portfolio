import Link from 'next/link';

import { PortfolioGridCanvas } from '@/components/portfolio/portfolio-grid-canvas';
import { PortfolioStream } from '@/components/portfolio/portfolio-stream';
import portfolioData from '@/data/portfolio.json';
import { getAllStackNames, getFeaturedProject, getPublishedProjects } from '@/lib/portfolio';
import type { Project } from '@/types/portfolio';

export default function Home() {
  const projects = portfolioData.projects as Project[];
  const publishedProjects = getPublishedProjects(projects);
  const featuredProject = getFeaturedProject(projects);
  const stackNames = getAllStackNames(projects);
  const githubLink = portfolioData.profile.links.find((link) => link.type === 'github');

  if (!featuredProject) {
    return (
      <main className="mx-auto flex min-h-screen w-full max-w-6xl items-center px-6 py-16">
        <p className="text-muted-foreground">当前没有可展示的精选项目。</p>
      </main>
    );
  }

  return (
    <main className="relative isolate mx-auto w-full max-w-6xl px-6 py-6 sm:px-8 lg:px-10">
      <PortfolioGridCanvas />
      <header className="flex items-center justify-between border-b border-border py-5">
        <Link href="/" className="text-sm font-semibold tracking-tight">
          Jiang Junfeng
        </Link>

        <nav aria-label="主导航" className="flex items-center gap-5 text-sm">
          <Link href="#projects" className="text-muted-foreground transition-colors hover:text-foreground">
            项目
          </Link>
          <Link href="#capabilities" className="text-muted-foreground transition-colors hover:text-foreground">
            能力
          </Link>
          <Link href="/manage" className="text-muted-foreground transition-colors hover:text-foreground">
            管理内容
          </Link>
        </nav>
      </header>

      <section className="grid gap-10 border-b border-border py-20 lg:grid-cols-[1.15fr_0.85fr] lg:items-end lg:py-28">
        <div>
          <p className="mb-6 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
            Interactive portfolio
          </p>
          <h1 className="max-w-3xl text-5xl font-semibold tracking-[-0.04em] sm:text-6xl lg:text-8xl">
            {portfolioData.profile.headline}
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-8 text-muted-foreground">{portfolioData.profile.summary}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href={`/projects/${featuredProject.slug}`}
              className="inline-flex items-center bg-foreground px-5 py-3 text-sm font-medium text-background transition-opacity hover:opacity-80"
            >
              查看 {featuredProject.title}
              <span aria-hidden="true" className="ml-2">
                →
              </span>
            </Link>
            {githubLink ? (
              <a
                href={githubLink.href}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center border border-border px-5 py-3 text-sm font-medium transition-colors hover:border-foreground"
              >
                查看 GitHub
              </a>
            ) : null}
          </div>
        </div>

        <div className="border-l-2 border-foreground pl-6 lg:mb-2">
          <p className="text-sm font-medium">独立完成复杂产品</p>
          <p className="mt-3 text-sm leading-6 text-muted-foreground">
            从需求拆解、数据建模和 UI 实现，到接口联调、异常状态、测试和构建验证。
          </p>
          <p className="mt-8 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            {portfolioData.profile.location}
          </p>
        </div>
      </section>

      <section id="projects" className="border-b border-border py-16 lg:py-24">
        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Selected work</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">项目案例</h2>
          </div>
          <p className="max-w-sm text-sm leading-6 text-muted-foreground">
            用真实项目说明如何处理复杂业务、数据流和工程边界。
          </p>
        </div>

        <div className="mt-10">
          <PortfolioStream projects={publishedProjects} />
        </div>
      </section>

      <section id="capabilities" className="border-b border-border py-16 lg:py-24">
        <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Capabilities</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">能力证明</h2>
          </div>

          <div className="grid gap-0 border-t border-border sm:grid-cols-2">
            <article className="border-b border-border py-6 sm:border-r sm:pr-6">
              <h3 className="font-medium">理解复杂需求</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                将任务、社区、媒体等业务场景拆分为清晰的信息结构和用户流程。
              </p>
            </article>
            <article className="border-b border-border py-6 sm:pl-6">
              <h3 className="font-medium">构建完整产品</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                覆盖页面、状态、表单、接口、异常体验和可持续维护的组件边界。
              </p>
            </article>
            <article className="py-6 sm:border-r sm:pr-6">
              <h3 className="font-medium">处理真实边界</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                关注权限、URL 状态、分页、持久化、加载、空数据和错误状态。
              </p>
            </article>
            <article className="border-t border-border py-6 sm:pl-6">
              <h3 className="font-medium">验证工程质量</h3>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">
                使用 TypeScript strict、表单 schema、Vitest、Playwright 和 CI。
              </p>
            </article>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">Technology</p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">技术栈</h2>
          </div>

          <div className="flex max-w-2xl flex-wrap gap-2 sm:justify-end">
            {stackNames.map((technology) => (
              <span key={technology} className="border border-border px-3 py-2 text-sm text-muted-foreground">
                {technology}
              </span>
            ))}
          </div>
        </div>

        <footer className="mt-16 flex flex-col gap-4 border-t border-border pt-6 text-sm text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <span>{portfolioData.profile.availability}</span>
          <span>{portfolioData.profile.location}</span>
        </footer>
      </section>
    </main>
  );
}
