// app/(tabs)/explore.tsx
import React from "react";
import { SafeAreaView, View, Text, StyleSheet, ScrollView } from "react-native";

const palette = {
  bg: "#050308",
  card: "#140910",
  cardSoft: "#1e1116",
  accentGold: "#facc15",
  accentGreen: "#16a34a",
  accentRed: "#ef4444",
  textMain: "#fefce8",
  textSub: "#e5e7eb",
  textMuted: "#9ca3af",
  border: "#3f2a32"
};

export default function ExploreScreen() {
  return (
    <SafeAreaView style={styles.safe}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Flag accent */}
        <View style={styles.flagBar}>
          <View style={[styles.flagStripe, { backgroundColor: palette.accentGreen }]} />
          <View style={[styles.flagStripe, { backgroundColor: palette.accentGold }]} />
          <View style={[styles.flagStripe, { backgroundColor: palette.accentRed }]} />
        </View>

        <View style={styles.header}>
          <Text style={styles.title}>Explore Pidgin Pal 🌍</Text>
          <Text style={styles.subtitle}>
            Ideas for expanding this app into a full Afrocentric language companion.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>✨ Phrase Categories</Text>
          <Text style={styles.cardText}>
            Organise phrases into clusters: greetings, food, market, transport,
            relationships, work, and playful slang. Let users filter by how
            they actually live.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🎯 Quiz Mode</Text>
          <Text style={styles.cardText}>
            Quick-fire quizzes with hearts or stars. Match the Pidgin phrase to
            its meaning or complete the sentence. Reward streaks and consistency.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>🔊 Pronunciation Practice</Text>
          <Text style={styles.cardText}>
            Add short audio clips from different regions so learners hear real
            accents — Mainland vs Island, PH vs Abuja, and beyond.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>⭐ Saved Favorites</Text>
          <Text style={styles.cardText}>
            Let users pin their go-to phrases for dates, job interviews, market
            bargaining or just cruise. Sync them locally so it still works
            offline.
          </Text>
        </View>

        <View style={styles.cardSoft}>
          <Text style={styles.footer}>
            For now, use the{" "}
            <Text style={styles.footerHighlight}>Pidgin Pal</Text> tab to
            translate and pick up new phrases. This screen fit future upgrades
            wey go make the app feel like a full Naija language buddy. 💚💛❤️
          </Text>
        </View>
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
  content: {
    paddingHorizontal: 16,
    paddingTop: 10,
    paddingBottom: 32
  },
  flagBar: {
    flexDirection: "row",
    height: 4,
    borderRadius: 999,
    overflow: "hidden",
    marginBottom: 14
  },
  flagStripe: {
    flex: 1
  },
  header: {
    marginBottom: 18
  },
  title: {
    fontSize: 26,
    fontWeight: "800",
    color: palette.textMain
  },
  subtitle: {
    fontSize: 14,
    color: palette.textMuted,
    marginTop: 4
  },
  card: {
    backgroundColor: palette.card,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: palette.border
  },
  cardSoft: {
    backgroundColor: palette.cardSoft,
    borderRadius: 18,
    padding: 14,
    marginTop: 4,
    borderWidth: 1,
    borderColor: palette.border
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: palette.textSub,
    marginBottom: 4
  },
  cardText: {
    fontSize: 13,
    color: palette.textMuted,
    lineHeight: 18
  },
  footer: {
    fontSize: 13,
    color: palette.textMuted,
    lineHeight: 18
  },
  footerHighlight: {
    color: palette.accentGold,
    fontWeight: "700"
  }
});
