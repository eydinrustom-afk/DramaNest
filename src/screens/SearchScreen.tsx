import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  FlatList,
} from 'react-native';
import { COLORS } from '../constants/colors';
import { DRAMAS } from '../constants/data';
import SearchComponent from '../components/SearchComponent';

const SearchScreen = ({ navigation }: any) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [recentSearches, setRecentSearches] = useState(['قلوب في الميزان', 'السلطان', 'أسرار']);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  const handleSearch = (query: string) => {
    setIsSearching(true);
    setTimeout(() => {
      const results = DRAMAS.filter((drama) =>
        drama.title.includes(query) || drama.genre.includes(query)
      ).map((drama) => ({
        id: drama.id,
        title: drama.title,
        type: 'drama' as const,
        icon: drama.icon,
      }));
      setSearchResults(results);
      setIsSearching(false);
    }, 300);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
  };

  const handleAddRecentSearch = (query: string) => {
    if (!recentSearches.includes(query)) {
      setRecentSearches([query, ...recentSearches.slice(0, 4)]);
    }
  };

  return (
    <View style={styles.container}>
      {/* Search Bar */}
      <View style={styles.searchBar}>
        <TextInput
          style={styles.searchInput}
          placeholder="ابحث عن مسلسل..."
          placeholderTextColor={COLORS.mut}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery ? (
          <TouchableOpacity onPress={handleClearSearch}>
            <Text style={styles.clearButton}>✕</Text>
          </TouchableOpacity>
        ) : (
          <Text style={styles.searchIcon}>🔍</Text>
        )}
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {searchQuery ? (
          <SearchComponent
            query={searchQuery}
            results={searchResults}
            loading={isSearching}
            onSelectResult={(result) => {
              handleAddRecentSearch(result.title);
              navigation.navigate('DramaDetail', { dramaId: result.id });
            }}
          />
        ) : (
          <View style={styles.content}>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🕐 البحث الأخير</Text>
              <View style={styles.recentSearches}>
                {recentSearches.map((search, index) => (
                  <TouchableOpacity
                    key={index}
                    style={styles.recentSearchTag}
                    onPress={() => setSearchQuery(search)}
                  >
                    <Text style={styles.recentSearchText}>{search}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>🔥 الأكثر بحثاً</Text>
              <FlatList
                data={DRAMAS.slice(0, 5)}
                keyExtractor={(item) => item.id.toString()}
                scrollEnabled={false}
                renderItem={({ item, index }) => (
                  <TouchableOpacity
                    style={styles.trendingItem}
                    onPress={() => {
                      handleAddRecentSearch(item.title);
                      navigation.navigate('DramaDetail', { dramaId: item.id });
                    }}
                  >
                    <Text style={styles.trendingNumber}>#{index + 1}</Text>
                    <View style={styles.trendingContent}>
                      <Text style={styles.trendingTitle}>{item.title}</Text>
                      <Text style={styles.trendingInfo}>{item.genre}</Text>
                    </View>
                    <Text style={styles.trendingIcon}>{item.icon}</Text>
                  </TouchableOpacity>
                )}
              />
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: COLORS.surf,
    borderBottomColor: COLORS.brd,
    borderBottomWidth: 1,
  },
  searchInput: {
    flex: 1,
    backgroundColor: COLORS.card,
    borderRadius: 20,
    paddingHorizontal: 14,
    paddingVertical: 10,
    color: COLORS.txt,
    fontSize: 14,
  },
  searchIcon: {
    fontSize: 18,
    marginLeft: 10,
  },
  clearButton: {
    fontSize: 18,
    color: COLORS.mut,
    marginLeft: 10,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.txt,
    marginBottom: 12,
  },
  recentSearches: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  recentSearchTag: {
    backgroundColor: COLORS.card,
    borderColor: COLORS.brd,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 7,
  },
  recentSearchText: {
    fontSize: 12,
    color: COLORS.txt,
  },
  trendingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.card,
    borderRadius: 10,
    padding: 12,
    marginBottom: 10,
    borderColor: COLORS.brd,
    borderWidth: 1,
  },
  trendingNumber: {
    fontSize: 16,
    fontWeight: '900',
    color: COLORS.acc,
    marginRight: 12,
    width: 28,
  },
  trendingContent: {
    flex: 1,
  },
  trendingTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.txt,
    marginBottom: 3,
  },
  trendingInfo: {
    fontSize: 11,
    color: COLORS.mut,
  },
  trendingIcon: {
    fontSize: 24,
    marginLeft: 12,
  },
});

export default SearchScreen;
