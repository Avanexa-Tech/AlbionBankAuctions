import React, {useMemo} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import Color from '../Config/Color';
import Icon from 'react-native-vector-icons/Ionicons';
import common_fn from '../Config/common_fn';

const renderIcon = (value, key) => {
  if (
    key !== 'duration' &&
    key !== 'response_rate' &&
    key !== 'no_of_listings'
  ) {
    return value == '1' ? '1' : '0';
  } else {
    return value;
  }
};

const Table = React.memo(({data}) => {
  const keys = useMemo(() => {
    if (data && data.length > 0) {
      return Object.keys(data[0]).filter(
        key =>
          key !== 'plan_name' &&
          key !== 'plan_id' &&
          key !== 'plan_uid' &&
          key !== 'plan_group' &&
          key !== 'amount' &&
          key !== 'plan_price' &&
          key !== 'status' &&
          key !== 'created_at' &&
          key !== 'updated_at' &&
          key !== 'get_phone_quota' &&
          key !== 'user_type_id',
      );
    } else {
      return [];
    }
  }, [data]);

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator>
      <View style={styles.container}>
        <View style={[styles.row, styles.headerRow]}>
          <Text style={styles.headerCell}></Text>
          {data.map(item => (
            <View
              style={{
                width: 120,
                textAlign: 'center',
                paddingVertical: 10,
              }}>
              <Text
                key={item.plan_name}
                style={{
                  borderRadius: 10,
                  textAlign: 'center',
                  padding: 10,
                  color: Color.black,
                }}>
                {item.plan_name}
              </Text>
            </View>
          ))}
        </View>
        {keys.map((key, index) => (
          <View
            key={key}
            style={[
              styles.row,
              index % 2 === 0 ? styles.evenRow : styles.oddRow,
            ]}>
            <Text style={styles.headerCell}>{common_fn.formatText(key)}</Text>
            {data.map(item => (
              <Text key={item.plan_name} style={styles.cell}>
                {key !== 'duration' &&
                key !== 'response_rate' &&
                key !== 'no_of_listings' ? (
                  renderIcon(item[key], key) == '1' ? (
                    <Icon
                      name="checkmark-circle"
                      size={18}
                      color={Color.green}
                    />
                  ) : (
                    <Icon name="close-circle" size={18} color={Color.red} />
                  )
                ) : (
                  renderIcon(item[key], key)
                )}
              </Text>
            ))}
          </View>
        ))}
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  headerRow: {
    flexDirection: 'row',
    borderBottomWidth: 2,
    borderColor: '#000',
  },
  headerCell: {
    width: 120,
    textAlign: 'center',
    paddingVertical: 10,
    fontWeight: 'bold',
    color: Color.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cell: {
    width: 120,
    textAlign: 'center',
    paddingVertical: 10,
    color: Color.black,
  },
  headerText: {
    color: Color.black,
    textAlign: 'center',
  },
  evenRow: {
    backgroundColor: '#ffffff',
    alignItems: 'center',
  },
  oddRow: {
    backgroundColor: '#f7f7f7',
    alignItems: 'center',
  },
});

export default Table;
