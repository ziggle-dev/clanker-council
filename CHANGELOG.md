# Changelog

All notable changes to the Clanker Council tool will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.1.0] - 2025-07-30

### Changed
- **BREAKING**: Migrated to Clanker builder pattern using createTool()
- Updated tool to match the standard Clanker tool format
- Improved ElevenLabs TTS integration to use proper action/voice parameters
- Added voice mapping for council members to ElevenLabs voices
- Enhanced return value with structured data

### Fixed
- Tool now properly exports using the expected format
- Arguments are correctly received from Clanker
- Tool is now discoverable and executable by Clanker CLI

### Technical
- Uses @ziggler/clanker createTool() builder pattern
- Added proper examples for tool usage
- Returns success status and structured data

## [1.0.1] - 2025-07-30

### Fixed
- Fixed argument passing issue where topic was not being received by the tool
- Added proper error handling when topic is missing
- Improved tool structure to match Clanker's expected format
- Fixed export format to work with the registry's tool loading system

### Changed
- Simplified tool definition to use direct export instead of builder pattern
- Added validation to ensure required topic parameter is provided

## [1.0.0] - 2025-07-30

### Added
- Initial release of the Council tool
- Six distinct council member personalities:
  - Professor Wisdom (analytical/academic)
  - Captain Practical (results-oriented)
  - Dr. Innovation (creative/forward-thinking)
  - Guardian Ethics (risk-aware/principled)
  - Ambassador Harmony (diplomatic/balanced)
  - Maverick Challenge (contrarian/provocative)
- Configurable council size (2-6 members)
- Multi-round discussion format with opening statements, debate, and conclusions
- ElevenLabs TTS integration for audio output
- Structured conversation flow with personality-based responses
- Automatic consensus generation at discussion end
- Comprehensive documentation and examples

### Features
- Dynamic member selection based on requested count
- Customizable number of discussion rounds
- Optional voice output with member-specific voice profiles
- Formatted console output with clear sections
- Error handling for TTS failures

### Technical
- Built with TypeScript and Clanker Core SDK
- Follows modern builder pattern
- Includes proper type definitions
- Modular conversation generation system