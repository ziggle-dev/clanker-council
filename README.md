# Clanker Council Tool

A Clanker tool that summons a council of diverse personalities to discuss topics through structured dialogue, with optional audio output via ElevenLabs TTS.

## Installation

```bash
clanker install council
```

## Features

- **Dynamic Council Formation**: Choose 2-6 council members, each with unique personalities
- **Structured Discussions**: Multi-round discussions with opening statements, debate, and conclusions
- **Audio Output**: Optional text-to-speech for each council member using ElevenLabs
- **Diverse Perspectives**: Six distinct personality types offering different viewpoints
- **Consensus Building**: Automated summary of discussion outcomes

## Council Members

1. **Professor Wisdom** - Analytical and academic perspective
2. **Captain Practical** - Results-oriented and efficient approach
3. **Dr. Innovation** - Creative and forward-thinking ideas
4. **Guardian Ethics** - Ethical considerations and risk awareness
5. **Ambassador Harmony** - Diplomatic and consensus-seeking
6. **Maverick Challenge** - Contrarian viewpoint challenging assumptions

## Usage

Basic usage:
```bash
clanker council --topic "Should we implement AI in education?"
```

### Options

- `--topic` (required): The topic for discussion
- `--members`: Number of council members (2-6, default: 4)
- `--rounds`: Number of discussion rounds (default: 3)
- `--voice`: Enable/disable voice output (default: true)

### Examples

**Quick 3-member discussion:**
```bash
clanker council --topic "Remote work vs office work" --members 3 --rounds 2
```

**Extended debate without voice:**
```bash
clanker council --topic "Climate change solutions" --members 6 --rounds 5 --voice false
```

**Product strategy discussion:**
```bash
clanker council --topic "Should we pivot our product strategy?" --members 4
```

## Output Format

The tool provides structured output including:

1. **Session Overview**: Topic, member count, and settings
2. **Council Introduction**: List of participating members and their perspectives
3. **Discussion Rounds**: 
   - Round 1: Opening statements
   - Middle rounds: Discussion and debate
   - Final round: Closing statements
4. **Council Consensus**: Summary of key themes and recommendations

## Audio Output

When voice is enabled, the tool:
- Generates MP3 files for each statement
- Uses different voice profiles for each council member
- Saves audio files with descriptive names
- Requires the `elevenlabs-tts` tool to be installed

## Use Cases

- **Decision Making**: Get diverse perspectives on important decisions
- **Brainstorming**: Generate creative ideas through structured dialogue
- **Risk Assessment**: Evaluate proposals from multiple angles
- **Learning**: Understand complex topics through varied viewpoints
- **Entertainment**: Create engaging discussions on any topic

## Dependencies

- `elevenlabs-tts` (for voice output functionality)

## Examples of Council Sessions

### Technology Decision
```bash
clanker council --topic "Should we migrate to microservices?"

# Output includes:
# - Professor Wisdom discussing architectural patterns
# - Captain Practical focusing on implementation costs
# - Dr. Innovation exploring scalability benefits
# - Guardian Ethics warning about complexity risks
```

### Creative Brainstorming
```bash
clanker council --topic "Ideas for our company's 10th anniversary"

# Council generates:
# - Traditional approaches (Professor Wisdom)
# - Cost-effective solutions (Captain Practical)
# - Innovative celebrations (Dr. Innovation)
# - Inclusive considerations (Guardian Ethics)
```

### Ethical Dilemma
```bash
clanker council --topic "AI replacing human jobs" --members 6

# Full council debate including:
# - Academic research perspectives
# - Practical transition strategies
# - Innovation opportunities
# - Ethical implications
# - Balanced solutions
# - Challenging assumptions
```

## Tips

1. **Topic Framing**: Frame topics as questions for best results
2. **Member Selection**: More members = more diverse perspectives but longer discussions
3. **Round Count**: 3 rounds work well for most topics; use more for complex issues
4. **Voice Output**: Enable for immersive experience, disable for faster processing

## Troubleshooting

- **Voice not working**: Ensure `elevenlabs-tts` is installed and configured
- **Long processing**: Reduce members or rounds, or disable voice
- **Repetitive responses**: Try rephrasing the topic as a more specific question

## Contributing

Contributions are welcome! Ideas for improvement:
- Additional personality types
- Custom personality definitions
- Interactive mode for user participation
- Export conversation transcripts

## License

MIT License - see LICENSE file for details