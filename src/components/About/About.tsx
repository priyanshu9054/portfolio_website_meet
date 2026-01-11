import React from 'react';
import aboutContent from '../../../content/sections/about.json';
import timelineData from '../../../content/data/timeline.json';
import Timeline from '../Timeline/Timeline';

const About: React.FC = () => {
    const { title, subtitle, bio, highlights, image } = aboutContent;

    return (
        <section className="pt-64 px-6 max-w-6xl mx-auto pb-48 bg-transparent">
            <div className="grid md:grid-cols-2 gap-32 mb-48">
                <div className="space-y-16">
                    <div className="space-y-8">
                        <span className="text-[#3b82f6] font-bold uppercase tracking-[0.6em] text-[10px]">{subtitle}</span>
                        <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none italic text-white">{title}</h1>
                    </div>
                    <div className="space-y-8 text-xl text-white/70 font-light leading-relaxed">
                        {bio.map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace('Applied AI Engineer', '<span class="text-white font-medium">Applied AI Engineer</span>').replace('Georgia Tech', '<span class="text-[#3b82f6] font-semibold">Georgia Tech</span>').replace('UPenn', '<span class="text-[#3b82f6] font-semibold">UPenn</span>') }} />
                        ))}
                        <div className="pt-8">
                            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.4em] mb-6">{highlights.title}</h4>
                            <ul className="space-y-4">
                                {highlights.items.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-1.5 h-1.5 bg-[#2563eb] rounded-full mt-2" />
                                        <p className="text-sm text-white/70">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/5] rounded-[4rem] overflow-hidden group border border-white/10 bg-white/5 backdrop-blur-xl">
                        <img
                            src={image}
                            alt="Meet Doshi"
                            className="w-full h-full object-cover grayscale brightness-90 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-1000"
                        />
                    </div>
                    {/* Blue accent glow */}
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#2563eb]/15 blur-[80px] rounded-full pointer-events-none" />
                </div>
            </div>

            <div className="grid md:grid-cols-2 gap-32">
                <Timeline title="Education" items={timelineData.education} />
                <Timeline title="Experience" items={timelineData.experience} />
            </div>
        </section>
    );
};

export default About;
