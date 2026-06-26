import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/colors';

interface Comment {
  id: number;
  author: string;
  text: string;
  rating: number;
  date: string;
  avatar: string;
}

interface CommentsComponentProps {
  comments: Comment[];
  onAddComment?: () => void;
}

const CommentsComponent: React.FC<CommentsComponentProps> = ({ comments, onAddComment }) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>💬 التعليقات</Text>
        {onAddComment && (
          <TouchableOpacity onPress={onAddComment}>
            <Text style={styles.addButton}>+ إضافة</Text>
          </TouchableOpacity>
        )}
      </View>

      {comments.length === 0 ? (
        <Text style={styles.noComments}>لا توجد تعليقات بعد</Text>
      ) : (
        <FlatList
          data={comments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.commentItem}>
              <View style={styles.avatarContainer}>
                <Text style={styles.avatar}>{item.avatar}</Text>
              </View>
              <View style={styles.commentContent}>
                <View style={styles.commentHeader}>
                  <Text style={styles.author}>{item.author}</Text>
                  <Text style={styles.rating}>⭐ {item.rating}</Text>
                </View>
                <Text style={styles.text}>{item.text}</Text>
                <Text style={styles.date}>{item.date}</Text>
              </View>
            </View>
          )}
          scrollEnabled={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 18,
    paddingVertical: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.txt,
  },
  addButton: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.acc,
  },
  noComments: {
    fontSize: 14,
    color: COLORS.mut,
    textAlign: 'center',
    paddingVertical: 16,
  },
  commentItem: {
    flexDirection: 'row',
    marginBottom: 12,
    paddingBottom: 12,
    borderBottomColor: COLORS.brd,
    borderBottomWidth: 1,
  },
  avatarContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: COLORS.card,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  avatar: {
    fontSize: 20,
  },
  commentContent: {
    flex: 1,
  },
  commentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  author: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.txt,
  },
  rating: {
    fontSize: 11,
    color: COLORS.acc,
    fontWeight: '600',
  },
  text: {
    fontSize: 12,
    color: COLORS.txt,
    lineHeight: 18,
    marginBottom: 4,
  },
  date: {
    fontSize: 10,
    color: COLORS.mut,
  },
});

export default CommentsComponent;
