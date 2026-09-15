import Image from "next/image";
import SectionHeading from "@/components/SectionHeading";
import { getSiteSettings } from "@/lib/data";
import { Heart, Target, Compass, Award, ShieldCheck, Sparkles, CheckCircle2 } from "lucide-react";

export const metadata = {
  title: "About Us | Best NGO for Children in India",
  description: "Learn about Karuna Sneham Foundation, a top NGO in India dedicated to underprivileged children, child education, and spreading happiness through donation drives.",
};

export default async function AboutPage() {
  const settings = await getSiteSettings();

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 space-y-16">
      <SectionHeading
        align="center"
        eyebrow="About Us"
        title="Every Child Deserves a Reason to Smile"
        description={`${settings.ngo_name} was founded on a simple belief: joy shouldn't be a privilege. We connect individuals and families with underprivileged children, turning personal milestones into shared moments of celebration.`}
      />

      {/* Hero Banner Image */}
      <div className="relative aspect-[16/9] w-full overflow-hidden rounded-3xl shadow-card border border-primary/10 group">
        <Image
          src="/group.jpeg"
          alt="Children at a Karuna Sneham Foundation gathering"
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 text-white flex items-center justify-between">
          <span className="text-xs sm:text-sm font-medium bg-white/20 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/20">
            ✨ Registered Non-Profit NGO in Uttar Pradesh
          </span>
          {settings.cin && (
            <span className="hidden sm:inline-block font-mono text-xs text-white/80">
              CIN: {settings.cin}
            </span>
          )}
        </div>
      </div>

      {/* Mission & Vision Cards */}
      <div className="grid gap-8 sm:grid-cols-2">
        <div className="rounded-3xl bg-surface p-8 shadow-card border border-primary/10 relative overflow-hidden">
          <div className="h-12 w-12 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-4">
            <Target className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary mb-3">Our Mission</h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            To bring warmth, festive celebration, and everyday dignity into the lives of underprivileged children by turning individual milestone occasions into shared drives of compassion.
          </p>
        </div>

        <div className="rounded-3xl bg-surface p-8 shadow-card border border-primary/10 relative overflow-hidden">
          <div className="h-12 w-12 rounded-2xl bg-accent/10 flex items-center justify-center text-accent mb-4">
            <Compass className="h-6 w-6" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary mb-3">Our Vision</h3>
          <p className="text-sm text-ink-soft leading-relaxed">
            A world where no child&apos;s birthday, festival, or milestone passes unremembered — where celebration and warm meals are treated as every child&apos;s natural right.
          </p>
        </div>
      </div>

      {/* Objectives Grid */}
      <div className="rounded-3xl bg-surface p-8 sm:p-10 shadow-card border border-primary/10">
        <div className="flex items-center gap-3 mb-6">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-rose-500/10 text-rose-600">
            <Award className="h-5 w-5" />
          </div>
          <h3 className="font-display text-2xl font-bold text-primary">Core Objectives & Commitments</h3>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 text-sm text-ink-soft">
          <div className="flex items-start gap-3 rounded-2xl bg-background p-4 border border-primary/5">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>Host birthday, anniversary, and festival drives sponsored directly by families.</span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-background p-4 border border-primary/5">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>Distribute fresh nutritious meals, custom cakes, and fruit juices.</span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-background p-4 border border-primary/5">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>Provide school stationery bags, drawing books, and educational kits.</span>
          </div>
          <div className="flex items-start gap-3 rounded-2xl bg-background p-4 border border-primary/5">
            <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
            <span>Maintain complete media transparency with HD video & photo updates.</span>
          </div>
        </div>
      </div>

      {/* Team Members */}
      <div className="space-y-8">
        {settings.founder_name && (
          <TeamMemberCard name={settings.founder_name} role={settings.founder_role} bio={settings.founder_bio} imageUrl={settings.founder_image_url} tag="Founder" />
        )}
        {settings.co_founder_name && (
          <TeamMemberCard name={settings.co_founder_name} role={settings.co_founder_role} bio={settings.co_founder_bio} imageUrl={settings.co_founder_image_url} tag="Co-Founder" />
        )}
        {settings.director_name && (
          <TeamMemberCard name={settings.director_name} role={settings.director_role} bio={settings.director_bio} imageUrl={settings.director_image_url} tag="Director" />
        )}
        {settings.member_name && (
          <TeamMemberCard name={settings.member_name} role={settings.member_role} bio={settings.member_bio} imageUrl={settings.member_image_url} tag="Core Member" />
        )}
      </div>
    </div>
  );
}

function TeamMemberCard({
  name,
  role,
  bio,
  imageUrl,
  tag,
}: {
  name: string;
  role: string | null;
  bio: string | null;
  imageUrl: string | null;
  tag: string;
}) {
  const initials = name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
    
  return (
    <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-dark to-slate-950 p-8 sm:p-12 text-white shadow-2xl border border-white/10">
      <div className="absolute -top-12 -right-12 h-60 w-60 rounded-full bg-secondary/20 blur-3xl pointer-events-none" />
      
      <div className="relative z-10 space-y-6">
        <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3.5 py-1 text-xs font-semibold text-secondary-light backdrop-blur-md border border-white/10">
          <Sparkles className="h-3.5 w-3.5" /> {tag}
        </div>

        <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
          {imageUrl ? (
            <div className="relative h-32 w-32 shrink-0 overflow-hidden rounded-2xl border-2 border-white/20 shadow-lg">
              <Image src={imageUrl} alt={name} fill className="object-cover" />
            </div>
          ) : (
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-white/10 text-white font-display text-2xl font-bold border border-white/15">
              {initials}
            </div>
          )}

          <div className="space-y-2">
            <h3 className="font-display text-2xl font-bold text-white">{name}</h3>
            {role && (
              <p className="text-xs font-semibold text-secondary-light tracking-wide uppercase">
                {role}
              </p>
            )}
            <p className="text-sm text-white/85 leading-relaxed whitespace-pre-line pt-2">
              {bio}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
