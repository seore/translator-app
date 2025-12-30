import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
  StatusBar
} from "react-native";
import { translateText, getRandomPhrase } from "./translationService";
import { pidginDictionary } from "./dictionary";

export default function App() {
  const [direction, setDirection] = useState("en-to-pidgin");
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [phraseOfTheDay, setPhraseOfTheDay] = useState(null);

  useEffect(() => {
    const randomPhrase = getRandomPhrase();
    setPhraseOfTheDay(randomPhrase);
  }, []);

  const handleTranslate = () => {
    const translation = translateText(input, direction);
    setResult(translation);
  };

  const toggleDirection = () => {
    setDirection((prev) =>
      prev === "en-to-pidgin" ? "pidgin-to-en" : "en-to-pidgin"
    );
    setResult(null);
    setInput("");
  };

  const directionLabel =
    direction === "en-to-pidgin"
      ? "English → Nigerian Pidgin"
      : "Nigerian Pidgin → English";

  const renderPhraseItem = ({ item }) => (
    <View style={styles.phraseCard}>
      <Text style={styles.phraseFrom}>{item.from}</Text>
      <Text style={styles.phraseTo}>{item.to}</Text>
      {item.pronunciation ? (
        <Text style={styles.pronunciation}>
          Pronunciation: {item.pronunciation}
        </Text>
      ) : null}
      {item.examples && item.examples[0] && (
        <Text style={styles.example}>
          Example:{" "}
          {item.languageFrom === "en"
            ? `${item.examples[0].en} → ${item.examples[0].pidgin}`
            : `${item.examples[0].pidgin} → ${item.examples[0].en}`}
        </Text>
      )}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.appTitle}>Pidgin Pal</Text>
        <Text style={styles.appSubtitle}>
          Learn & translate Nigerian Pidgin with vibes ✨
        </Text>
      </View>

      {/* Language Direction Toggle */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleDirection}>
        <Text style={styles.toggleText}>{directionLabel}</Text>
        <Text style={styles.toggleHint}>(Tap to switch direction)</Text>
      </TouchableOpacity>

      {/* Input + Translate */}
      <View style={styles.translateBox}>
        <Text style={styles.label}>
          {direction === "en-to-pidgin"
            ? "Type an English phrase"
            : "Type a Pidgin phrase"}
        </Text>
        <TextInput
          style={styles.input}
          placeholder={
            direction === "en-to-pidgin"
              ? "e.g. What’s going on?"
              : "e.g. Wetin dey happen?"
          }
          placeholderTextColor="#6b7280"
          multiline
          value={input}
          onChangeText={setInput}
        />
        <TouchableOpacity style={styles.translateButton} onPress={handleTranslate}>
          <Text style={styles.translateButtonText}>Translate</Text>
        </TouchableOpacity>
      </View>

      {/* Translation Result */}
      {result && (
        <View style={styles.resultCard}>
          <Text style={styles.resultLabel}>Translation</Text>
          <Text style={styles.resultText}>{result.to}</Text>

          {result.pronunciation ? (
            <>
              <Text style={styles.resultLabelSmall}>Pronunciation</Text>
              <Text style={styles.resultSubText}>{result.pronunciation}</Text>
            </>
          ) : null}

          {result.examples && result.examples.length > 0 && (
            <>
              <Text style={styles.resultLabelSmall}>Example</Text>
              <Text style={styles.resultSubText}>
                {direction === "en-to-pidgin"
                  ? `${result.examples[0].en} → ${result.examples[0].pidgin}`
                  : `${result.examples[0].pidgin} → ${result.examples[0].en}`}
              </Text>
            </>
          )}
        </View>
      )}

      {/* Phrase of the Day */}
      {phraseOfTheDay && (
        <View style={styles.phraseOfDayCard}>
          <Text style={styles.sectionTitle}>Phrase of the Day</Text>
          <Text style={styles.phraseOfDayMain}>{phraseOfTheDay.from}</Text>
          <Text style={styles.phraseOfDaySub}>{phraseOfTheDay.to}</Text>
          {phraseOfTheDay.pronunciation && (
            <Text style={styles.pronunciationSmall}>
              {phraseOfTheDay.pronunciation}
            </Text>
          )}
        </View>
      )}

      {/* Phrasebook */}
      <View style={styles.phrasebookContainer}>
        <Text style={styles.sectionTitle}>Popular Pidgin Phrases</Text>
        <FlatList
          data={pidginDictionary}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderPhraseItem}
          horizontal
          showsHorizontalScrollIndicator={false}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#050816",
    paddingHorizontal: 16,
    paddingTop: 8
  },
  header: {
    marginBottom: 16
  },
  appTitle: {
    fontSize: 28,
    fontWeight: "700",
    color: "#ffffff"
  },
  appSubtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4
  },
  toggleButton: {
    backgroundColor: "#111827",
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  toggleText: {
    color: "#e5e7eb",
    fontSize: 16,
    fontWeight: "600"
  },
  toggleHint: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4
  },
  translateBox: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  label: {
    color: "#9ca3af",
    marginBottom: 6,
    fontSize: 13
  },
  input: {
    backgroundColor: "#020617",
    color: "#f9fafb",
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 8,
    fontSize: 15,
    minHeight: 40
  },
  translateButton: {
    marginTop: 10,
    backgroundColor: "#22c55e",
    paddingVertical: 10,
    borderRadius: 999,
    alignItems: "center"
  },
  translateButtonText: {
    color: "#022c22",
    fontWeight: "700",
    fontSize: 16
  },
  resultCard: {
    backgroundColor: "#0b1120",
    borderRadius: 16,
    padding: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  resultLabel: {
    color: "#a5b4fc",
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 4
  },
  resultLabelSmall: {
    color: "#9ca3af",
    fontSize: 12,
    fontWeight: "600",
    marginTop: 8,
    marginBottom: 2
  },
  resultText: {
    color: "#e5e7eb",
    fontSize: 18,
    fontWeight: "600"
  },
  resultSubText: {
    color: "#d1d5db",
    fontSize: 14
  },
  phraseOfDayCard: {
    backgroundColor: "#111827",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  sectionTitle: {
    color: "#a5b4fc",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6
  },
  phraseOfDayMain: {
    color: "#f9fafb",
    fontSize: 16,
    fontWeight: "600"
  },
  phraseOfDaySub: {
    color: "#e5e7eb",
    fontSize: 14,
    marginTop: 2
  },
  pronunciationSmall: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 2
  },
  phrasebookContainer: {
    marginTop: 4
  },
  phraseCard: {
    backgroundColor: "#020617",
    borderRadius: 14,
    padding: 10,
    marginRight: 8,
    width: 220,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  phraseFrom: {
    color: "#f9fafb",
    fontSize: 14,
    fontWeight: "600"
  },
  phraseTo: {
    color: "#a5b4fc",
    fontSize: 14,
    marginTop: 2
  },
  pronunciation: {
    color: "#9ca3af",
    fontSize: 12,
    marginTop: 4
  },
  example: {
    color: "#d1d5db",
    fontSize: 12,
    marginTop: 4
  }
});