
import React from 'react';
import aboutContent from '../../../content/sections/about.json';
import timelineData from '../../../content/data/timeline.json';
import Timeline from '../Timeline/Timeline';

const About: React.FC = () => {
    const { title, subtitle, bio, highlights, image } = aboutContent;

    return (
        <section className="pt-64 px-6 max-w-6xl mx-auto pb-48">
            <div className="grid md:grid-cols-2 gap-32 mb-48">
                <div className="space-y-16">
                    <div className="space-y-8">
                        <span className="text-[#003057]/40 font-bold uppercase tracking-[0.6em] text-[10px]">{subtitle}</span>
                        <h1 className="text-7xl md:text-[8rem] font-bold tracking-tighter leading-none italic text-[#003057]">{title}</h1>
                    </div>
                    <div className="space-y-8 text-xl text-[#003057]/60 font-light leading-relaxed">
                        {bio.map((p, i) => (
                            <p key={i} dangerouslySetInnerHTML={{ __html: p.replace('Applied AI Engineer', '<span class="text-[#003057] font-medium">Applied AI Engineer</span>').replace('Georgia Tech', '<span class="text-[#003057] font-medium">Georgia Tech</span>').replace('UPenn', '<span class="text-[#003057] font-medium">UPenn</span>') }} />
                        ))}
                        <div className="pt-8">
                            <h4 className="text-[10px] font-bold text-[#003057]/30 uppercase tracking-[0.4em] mb-6">{highlights.title}</h4>
                            <ul className="space-y-4">
                                {highlights.items.map((item, i) => (
                                    <li key={i} className="flex gap-4">
                                        <div className="w-1 h-1 bg-blue-500 rounded-full mt-2" />
                                        <p className="text-sm">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="relative">
                    <div className="aspect-[4/5] glass rounded-[4rem] overflow-hidden group border-white/10">
                        <img
                            src={image}
                            alt="Meet Doshi"
                            className="w-full h-full object-cover grayscale brightness-100 group-hover:grayscale-0 transition-all duration-1000"
                        />
                    </div>
                    <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-[#A4925A]/10 blur-[80px] rounded-full pointer-events-none" />
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
