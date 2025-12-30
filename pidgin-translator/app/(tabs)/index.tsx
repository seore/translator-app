import React, { useState, useEffect, useRef } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  ScrollView,
  StatusBar
} from "react-native";

import { translateText, getRandomPhrase } from "../../translationService";
import { Audio } from "expo-av";

// ----- Types -----
type Direction = "en-to-pidgin" | "pidgin-to-en";

type ExamplePair = {
  en?: string;
  pidgin?: string;
};

type PhraseEntry = {
  id: number;
  languageFrom: "en" | "pidgin";
  languageTo: "en" | "pidgin";
  from: string;
  to: string;
  pronunciation?: string;
  audio?: any;
  examples?: ExamplePair[];
  tags?: string[];
};

// Afrocentric palette
const palette = {
  bg: "#050308",
  card: "#140910",
  cardSoft: "#1e1116",
  accentGold: "#facc15",
  accentGreen: "#16a34a",
  accentRed: "#ef4444",
  textMain: "#fefce8",
  textSub: "#d9d9d9ff",
  textMuted: "#ffffffff",
  border: "#3f2a32",
  chipBg: "#1c1917"
};

export default function HomeScreen() {
  const [direction, setDirection] = useState<Direction>("en-to-pidgin");
  const [input, setInput] = useState<string>("");
  const [result, setResult] = useState<PhraseEntry | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const soundRef = useRef<Audio.Sound | null>(null);

  const handleTranslate = () => {
    const translation = translateText(input, direction) as PhraseEntry | null;
    setResult(translation);
  };

  const toggleDirectionChip = (nextDirection: Direction) => {
    setDirection(nextDirection);
    setResult(null);
  };

  const isEnToPidgin = direction === "en-to-pidgin";

  const playPronunciation = async () => {
    if (!result || !result.audio || isPlaying) return;

    try {
        if (soundRef.current) {
            await soundRef.current.unloadAsync();
            soundRef.current = null;
        }

        const { sound } = await Audio.Sound.createAsync(result.audio);
        soundRef.current = sound;
        setIsPlaying(true);

        sound.setOnPlaybackStatusUpdate((status) => {
            if (!status.isLoaded) return;
            if (status.didJustFinish) {
                setIsPlaying(false);
            }
        });

        await sound.playAsync();
    } catch (e) {
        console.warn("Error playing requested audio", e);
        setIsPlaying(false);
    }
  };

  useEffect(() => {
    return () => {
        if (soundRef.current) {
            soundRef.current.unloadAsync();
        }
    };
  }, []);

  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        {/* Top accent bar */}
        <View style={styles.flagBar}>
          <View style={[styles.flagStripe, { backgroundColor: palette.accentGreen }]} />
          <View style={[styles.flagStripe, { backgroundColor: palette.accentGold }]} />
          <View style={[styles.flagStripe, { backgroundColor: palette.accentRed }]} />
        </View>

        {/* Header */}
        <View style={styles.header}>
          <View>
            <Text style={styles.appTitle}>Pidgin Pal</Text>
            <Text style={styles.appSubtitle}>
              Learn & translate Nigerian Pidgin with Afro vibes
            </Text>
          </View>
          <View style={styles.badge}>
            <Text style={styles.badgeText}>Naija</Text>
          </View>
        </View>

        {/* Direction chips */}
        <View style={styles.toggleRow}>
          <TouchableOpacity
            style={[
              styles.toggleChip,
              isEnToPidgin && styles.toggleChipActiveLeft
            ]}
            onPress={() => toggleDirectionChip("en-to-pidgin")}
          >
            <Text
              style={[
                styles.toggleChipText,
                isEnToPidgin && styles.toggleChipTextActive
              ]}
            >
              English → Pidgin
            </Text>
            <Text style={styles.toggleChipHint}>For learning</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.toggleChip,
              !isEnToPidgin && styles.toggleChipActiveRight
            ]}
            onPress={() => toggleDirectionChip("pidgin-to-en")}
          >
            <Text
              style={[
                styles.toggleChipText,
                !isEnToPidgin && styles.toggleChipTextActive
              ]}
            >
              Pidgin → English
            </Text>
            <Text style={styles.toggleChipHint}>For decoding gist</Text>
          </TouchableOpacity>
        </View>

        {/* Input + Translate */}
        <View style={styles.translateBox}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabelSmall}>Your text</Text>
            <Text style={styles.sectionLabelLang}>
              {isEnToPidgin ? "English" : "Nigerian Pidgin"}
            </Text>
          </View>

          <TextInput
            style={styles.input}
            placeholder={
              isEnToPidgin
                ? "e.g. What’s going on?"
                : "e.g. Wetin dey happen?"
            }
            placeholderTextColor={palette.textMuted}
            multiline
            value={input}
            onChangeText={setInput}
          />

          <TouchableOpacity
            style={[
              styles.translateButton,
              !input.trim() && styles.translateButtonDisabled
            ]}
            onPress={handleTranslate}
            disabled={!input.trim()}
          >
            <Text style={styles.translateButtonText}>Translate</Text>
          </TouchableOpacity>

          <Text style={styles.helperText}>
            Tip: Start with greetings, simple questions or common street phrases.
          </Text>
        </View>

        {/* Translation Result */}
        {result && (
          <View style={styles.resultCard}>
            <View style={styles.sectionHeaderRow}>
              <Text style={styles.sectionLabel}>Translation</Text>
              <Text style={styles.sectionLabelLang}>
                {isEnToPidgin ? "Pidgin" : "English"}
              </Text>
            </View>

            <Text style={styles.resultMain}>{result.to}</Text>

            {result.audio && (
                <TouchableOpacity
                  style={[
                    styles.audioButton,
                    isPlaying && styles.audioButtonDisabled
                  ]}
                  onPress={playPronunciation}
                  disabled={isPlaying}
                >
                    <Text style={styles.audioButtonText}>
                        {isPlaying ? "Playing..." : "🔊 Play pronunciation"}
                    </Text>
                </TouchableOpacity>
            )}

            {result.pronunciation ? (
              <View style={styles.resultBlock}>
                <Text style={styles.resultLabelSmall}>Pronunciation</Text>
                <Text style={styles.resultSub}>{result.pronunciation}</Text>
              </View>
            ) : null}

            {result.examples && result.examples.length > 0 && (
              <View style={styles.resultBlock}>
                <Text style={styles.resultLabelSmall}>Example</Text>
                <Text style={styles.resultSub}>
                  {isEnToPidgin
                    ? `${result.examples[0].en} → ${result.examples[0].pidgin}`
                    : `${result.examples[0].pidgin} → ${result.examples[0].en}`}
                </Text>
              </View>
            )}
          </View>
        )}

        <View style={styles.footerSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: palette.bg
  },
  container: {
    flex: 1
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 4,
    paddingBottom: 24
  },
  flagBar: {
    flexDirection: "row",
    height: 4,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 10
  },
  flagStripe: {
    flex: 1
  },
  header: {
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  appTitle: {
    fontSize: 30,
    fontWeight: "800",
    color: palette.textMain
  },
  appSubtitle: {
    fontSize: 14,
    color: palette.textMuted,
    marginTop: 4,
    maxWidth: 260
  },
  badge: {
    backgroundColor: palette.cardSoft,
    borderRadius: 999,
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderWidth: 1,
    borderColor: palette.accentGold
  },
  badgeText: {
    color: palette.accentGold,
    fontSize: 11,
    fontWeight: "700"
  },
  toggleRow: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 14
  },
  toggleChip: {
    flex: 1,
    backgroundColor: palette.chipBg,
    borderRadius: 999,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: palette.border
  },
  toggleChipActiveLeft: {
    backgroundColor: palette.accentGreen,
    borderColor: "#bbf7d0"
  },
  toggleChipActiveRight: {
    backgroundColor: palette.accentRed,
    borderColor: "#fecaca"
  },
  toggleChipText: {
    color: palette.textSub,
    fontSize: 14,
    fontWeight: "600"
  },
  toggleChipTextActive: {
    color: "#050308"
  },
  toggleChipHint: {
    color: palette.textMuted,
    fontSize: 11,
    marginTop: 2
  },
  translateBox: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: palette.border
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 6
  },
  sectionLabel: {
    color: palette.accentGold,
    fontSize: 15,
    fontWeight: "700"
  },
  sectionLabelSmall: {
    color: palette.textMuted,
    fontSize: 13,
    fontWeight: "600"
  },
  sectionLabelLang: {
    color: palette.textSub,
    fontSize: 12,
    fontWeight: "600",
    backgroundColor: palette.cardSoft,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 999
  },
  input: {
    backgroundColor: palette.cardSoft,
    color: palette.textMain,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 15,
    minHeight: 44,
    borderWidth: 1,
    borderColor: palette.border
  },
  audioButton: {
    marginTop: 6,
    borderRadius: 999,
    paddingVertical: 8,
    paddingHorizontal: 12,
    alignSelf: "flex-start",
    backgroundColor: palette.cardSoft,
    borderWidth: 1,
    borderColor: palette.accentGold
  },
  audioButtonDisabled: {
    opacity: 0.6
  },
  audioButtonText: {
    color: palette.accentGold,
    fontSize: 13,
    fontWeight: "600"
  },
  translateButton: {
    marginTop: 10,
    backgroundColor: palette.accentGreen,
    paddingVertical: 12,
    borderRadius: 999,
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.35,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 5
  },
  translateButtonDisabled: {
    opacity: 0.6
  },
  translateButtonText: {
    color: "#ffffffff",
    fontWeight: "800",
    fontSize: 16,
    letterSpacing: 0.4
  },
  helperText: {
    marginTop: 6,
    fontSize: 11,
    color: palette.textMuted
  },
  resultCard: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: palette.border
  },
  resultMain: {
    color: palette.textMain,
    fontSize: 19,
    fontWeight: "700",
    marginBottom: 8
  },
  resultBlock: {
    marginTop: 6
  },
  resultLabelSmall: {
    color: palette.textMuted,
    fontSize: 12,
    fontWeight: "600",
    marginBottom: 2
  },
  resultSub: {
    color: palette.textSub,
    fontSize: 14
  },
  footerSpace: {
    height: 16
  }
});