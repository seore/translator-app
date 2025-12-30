import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <Text style={styles.title}>Explore Pidgin Pal 🌍</Text>
        <Text style={styles.subtitle}>
          More ways to learn Nigerian Pidgin (coming soon).
        </Text>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Phrase Categories</Text>
          <Text style={styles.cardText}>
            Break phrases into categories like greetings, food, market, dating,
            insults (small play), work, and travel.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Quiz Mode</Text>
          <Text style={styles.cardText}>
            Test yourself with multiple-choice questions. Guess the meaning of a
            Pidgin phrase or pick the correct Pidgin for an English sentence.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔊 Pronunciation Practice</Text>
          <Text style={styles.cardText}>
            Add audio so users can hear how real people talk on the streets of
            Lagos, PH, Abuja and beyond.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⭐ Saved Favorites</Text>
          <Text style={styles.cardText}>
            Let users save their favorite phrases to a personal phrasebook they
            can access offline.
          </Text>
        </View>

        <Text style={styles.footer}>
          For now, use the Pidgin Pal tab to translate and learn. More features
          go land here soon. 💚
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617"
  },
  content: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 40
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#f9fafb"
  },
  subtitle: {
    fontSize: 14,
    color: "#9ca3af",
    marginTop: 4,
    marginBottom: 16
  },
  card: {
    backgroundColor: "#0b1120",
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#1f2937"
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#e5e7eb",
    marginBottom: 4
  },
  cardText: {
    fontSize: 13,
    color: "#9ca3af"
  },
  footer: {
    marginTop: 12,
    fontSize: 13,
    color: "#6b7280"
  }
});
