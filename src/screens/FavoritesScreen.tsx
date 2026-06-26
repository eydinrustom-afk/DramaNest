import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { DRAMAS } from '../constants/data';

const FavoritesScreen = () => {
  const [favorites, setFavorites] = useState<typeof DRAMAS>([DRAMAS[0], DRAMAS[2], DRAMAS[4]]);
  const [sortBy, setSortBy] = useState('recent');

  const handleRemoveFavorite = (dramaId: number) => {
    setFavorites(favorites.filter((d) => d.id !== dramaId));
  };

  const sortedFavorites = [...favorites].sort((a, b) => {
    if (sortBy === 'rating') {
      return b.stars - a.stars;
    } else if (sortBy === 'alphabetical') {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>❤️ المفضلة</Text>
        <View style={styles.sortContainer}>
          {['recent', 'rating', 'alphabetical'].map((sort) => (
            <TouchableOpacity
              key={sort}
              style={[
                styles.sortButton,
                sortBy === sort && styles.sortButtonActive,
              ]}
              onPress={() => setSortBy(sort)}
            >
              <Text
                style={[
                  styles.sortButtonText,
                  sortBy === sort && styles.sortButtonTextActive,
                ]}
              >
                {sort === 'recent' ? 'الأحدث' : sort === 'rating' ? 'التقييم' : 'أبجدي'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      {favorites.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyIcon}>📭</Text>
          <Text style={styles.emptyTitle}>لا توجد مسلسلات مفضلة</Text>
          <Text style={styles.emptyText}>أضف مسلسلاتك المفضلة لعرضها هنا</Text>
        </View>
      ) : (
        <FlatList
          data={sortedFavorites}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2}
          columnWrapperStyle={styles.row}
          renderItem={({ item }) => (
            <View style={{ flex: 0.5, padding: 6 }}>
              <View style={styles.card}>
                <View style={styles.iconContainer}>
                  <Text style={styles.icon}>{item.icon}</Text>
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => handleRemoveFavorite(item.id)}
                  >
                    <Text style={styles.removeIcon}>✕</Text>
                  </TouchableOpacity>
                </View>
                <View style={styles.cardContent}>
                  <Text style={styles.dramaTitle} numberOfLines={2}>
                    {item.title}
                  </Text>
                  <Text style={styles.genre}>{item.genre}</Text>
                  <Text style={styles.rating}>⭐ {item.stars}</Text>
                </View>
              </View>
            </View>
          )}
          contentContainerStyle={styles.listContent}
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  header: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: COLORS.brd,
    borderBottomWidth: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.txt,
    marginBottom: 12,
  },
  sortContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.brd,
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  sortButtonActive: {
    backgroundColor: COLORS.acc,
    borderColor: COLORS.acc,
  },
  sortButtonText: {
    fontSize: 11,
    color: COLORS.mut,
    fontWeight: '600',
  },
  sortButtonTextActive: {
    color: COLORS.bg,
    fontWeight: '700',
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  emptyIcon: {
    fontSize: 80,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: COLORS.txt,
    marginBottom: 8,
    textAlign: 'center',
  },
  emptyText: {
    fontSize: 13,
    color: COLORS.mut,
    textAlign: 'center',
  },
  row: {
    justifyContent: 'space-between',
  },
  listContent: {
    paddingHorizontal: 6,
    paddingVertical: 10,
  },
  card: {
    backgroundColor: COLORS.card,
    borderRadius: 12,
    overflow: 'hidden',
    borderColor: COLORS.brd,
    borderWidth: 1,
  },
  iconContainer: {
    height: 120,
    backgroundColor: '#2a2a3a',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  icon: {
    fontSize: 48,
  },
  removeButton: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: COLORS.red,
    alignItems: 'center',
    justifyContent: 'center',
  },
  removeIcon: {
    fontSize: 16,
    color: COLORS.txt,
    fontWeight: '700',
  },
  cardContent: {
    padding: 10,
  },
  dramaTitle: {
    fontWeight: '700',
    fontSize: 12,
    color: COLORS.txt,
    marginBottom: 4,
    height: 28,
  },
  genre: {
    fontSize: 10,
    color: COLORS.mut,
    marginBottom: 4,
  },
  rating: {
    fontSize: 10,
    color: COLORS.acc,
    fontWeight: '700',
  },
});

export default FavoritesScreen;
