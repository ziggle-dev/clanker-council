import { createTool, ToolContext } from '@clanker/core';

interface CouncilMember {
  name: string;
  personality: string;
  voice: string;
  perspective: string;
}

const COUNCIL_MEMBERS: CouncilMember[] = [
  {
    name: 'Professor Wisdom',
    personality: 'wise and thoughtful',
    voice: 'mature',
    perspective: 'analytical and academic'
  },
  {
    name: 'Captain Practical',
    personality: 'pragmatic and direct',
    voice: 'confident',
    perspective: 'results-oriented and efficient'
  },
  {
    name: 'Dr. Innovation',
    personality: 'creative and enthusiastic',
    voice: 'energetic',
    perspective: 'innovative and forward-thinking'
  },
  {
    name: 'Guardian Ethics',
    personality: 'cautious and principled',
    voice: 'calm',
    perspective: 'ethical and risk-aware'
  },
  {
    name: 'Ambassador Harmony',
    personality: 'diplomatic and empathetic',
    voice: 'soothing',
    perspective: 'balanced and consensus-seeking'
  },
  {
    name: 'Maverick Challenge',
    personality: 'contrarian and provocative',
    voice: 'bold',
    perspective: 'challenging assumptions and status quo'
  }
];

export default createTool({
  name: 'council',
  description: 'Summon a council of personalities to discuss topics with audio output',
  version: '1.0.0',
  author: 'Clanker Community',
  category: 'Utility',
  capabilities: ['SystemExecute'],
  
  args: {
    topic: {
      type: 'string',
      description: 'The topic for the council to discuss',
      required: true
    },
    members: {
      type: 'number',
      description: 'Number of council members (2-6)',
      default: 4
    },
    rounds: {
      type: 'number',
      description: 'Number of discussion rounds',
      default: 3
    },
    voice: {
      type: 'boolean',
      description: 'Enable voice output via ElevenLabs TTS',
      default: true
    }
  },
  
  async execute(context: ToolContext) {
    const { args, output, executeSubtool } = context;
    const topic = args.topic as string;
    const memberCount = Math.min(Math.max(args.members as number || 4, 2), 6);
    const rounds = args.rounds as number || 3;
    const enableVoice = args.voice !== false;
    
    output.startSection('Council Session');
    output.write(`Topic: "${topic}"`);
    output.write(`Council Members: ${memberCount}`);
    output.write(`Discussion Rounds: ${rounds}`);
    output.write(`Voice Output: ${enableVoice ? 'Enabled' : 'Disabled'}`);
    output.write('');
    
    const selectedMembers = COUNCIL_MEMBERS.slice(0, memberCount);
    
    output.startSection('Council Members');
    for (const member of selectedMembers) {
      output.write(`• ${member.name} - ${member.personality} (${member.perspective})`);
    }
    output.write('');
    
    const conversation: { speaker: string; message: string }[] = [];
    
    async function speak(speaker: string, message: string) {
      conversation.push({ speaker, message });
      output.write(`${speaker}: ${message}`);
      output.write('');
      
      if (enableVoice) {
        try {
          const member = selectedMembers.find(m => m.name === speaker);
          await executeSubtool('elevenlabs-tts', {
            text: message,
            voice: member?.voice || 'default',
            output: `council-${speaker.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}.mp3`
          });
        } catch (error) {
          output.write(`[Voice output failed: ${error instanceof Error ? error.message : 'Unknown error'}]`);
        }
      }
    }
    
    output.startSection('Council Discussion');
    
    await speak('Moderator', `Welcome council members. Today we're discussing: "${topic}". Let's begin with opening statements.`);
    
    for (let round = 1; round <= rounds; round++) {
      output.write(`--- Round ${round} ---`);
      
      for (const member of selectedMembers) {
        let message = '';
        
        if (round === 1) {
          message = generateOpeningStatement(member, topic);
        } else if (round === rounds) {
          message = generateClosingStatement(member, topic, conversation);
        } else {
          message = generateDiscussionPoint(member, topic, conversation, round);
        }
        
        await speak(member.name, message);
        
        await new Promise(resolve => setTimeout(resolve, 500));
      }
    }
    
    output.startSection('Council Consensus');
    const consensus = generateConsensus(topic, conversation, selectedMembers);
    await speak('Moderator', consensus);
    
    output.success('Council session completed successfully!');
  }
});

function generateOpeningStatement(member: CouncilMember, topic: string): string {
  const statements: { [key: string]: string } = {
    'Professor Wisdom': `From an academic perspective, "${topic}" presents fascinating implications that we must examine through multiple theoretical lenses.`,
    'Captain Practical': `Let's cut to the chase. "${topic}" needs concrete action steps and measurable outcomes, not just theory.`,
    'Dr. Innovation': `How exciting! "${topic}" opens up incredible possibilities for creative solutions and breakthrough thinking!`,
    'Guardian Ethics': `We must carefully consider the ethical ramifications and potential risks associated with "${topic}" before proceeding.`,
    'Ambassador Harmony': `I believe we can find common ground on "${topic}" by understanding each perspective and building consensus together.`,
    'Maverick Challenge': `I'm going to challenge our assumptions here. What if everything we think we know about "${topic}" is wrong?`
  };
  
  return statements[member.name] || `Regarding "${topic}", I bring my ${member.perspective} viewpoint to this discussion.`;
}

function generateDiscussionPoint(member: CouncilMember, topic: string, conversation: any[], round: number): string {
  const templates: { [key: string]: string[] } = {
    'Professor Wisdom': [
      'Research suggests we should consider the long-term implications...',
      'The data indicates multiple factors at play here...',
      'Historical precedent teaches us that...'
    ],
    'Captain Practical': [
      'We need to focus on what actually works...',
      'The bottom line is implementation and results...',
      'Let me propose a concrete action plan...'
    ],
    'Dr. Innovation': [
      'What if we approached this completely differently?',
      'I see an opportunity for breakthrough innovation here...',
      'Let\'s think outside the box and explore new possibilities...'
    ],
    'Guardian Ethics': [
      'We must not overlook the potential consequences...',
      'The ethical considerations here are paramount...',
      'I urge caution and thorough risk assessment...'
    ],
    'Ambassador Harmony': [
      'I appreciate everyone\'s perspectives so far...',
      'Perhaps we can synthesize these viewpoints...',
      'Finding balance between these approaches is key...'
    ],
    'Maverick Challenge': [
      'I disagree with the prevailing assumption that...',
      'Let me play devil\'s advocate here...',
      'Why are we accepting this premise without question?'
    ]
  };
  
  const memberTemplates = templates[member.name] || ['From my perspective...'];
  return memberTemplates[(round - 2) % memberTemplates.length];
}

function generateClosingStatement(member: CouncilMember, topic: string, conversation: any[]): string {
  const statements: { [key: string]: string } = {
    'Professor Wisdom': 'In conclusion, our discussion has revealed the complexity of this issue, requiring thoughtful analysis and measured response.',
    'Captain Practical': 'To summarize: we need clear actions, defined timelines, and accountability measures to move forward effectively.',
    'Dr. Innovation': 'This has been inspiring! I see tremendous potential for creative solutions that can transform our approach.',
    'Guardian Ethics': 'My final thought: proceed with caution, maintain ethical standards, and carefully monitor outcomes.',
    'Ambassador Harmony': 'I believe we\'ve found valuable common ground that can guide us toward a balanced solution.',
    'Maverick Challenge': 'While consensus is forming, I maintain we should remain skeptical and continue questioning our assumptions.'
  };
  
  return statements[member.name] || `In closing, I maintain my ${member.perspective} stance on this matter.`;
}

function generateConsensus(topic: string, conversation: any[], members: CouncilMember[]): string {
  return `After thorough discussion, the council has explored "${topic}" from ${members.length} distinct perspectives. ` +
         `While complete agreement wasn't reached, key themes emerged: the need for careful analysis (Professor Wisdom), ` +
         `practical implementation (Captain Practical), innovative thinking (Dr. Innovation), ` +
         `ethical consideration (Guardian Ethics), balanced approach (Ambassador Harmony), ` +
         `and critical questioning (Maverick Challenge). The council recommends a multi-faceted approach ` +
         `that incorporates these diverse viewpoints for a comprehensive solution.`;
}