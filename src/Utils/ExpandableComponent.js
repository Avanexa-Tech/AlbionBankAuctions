import React, { useEffect, useState } from 'react';
// Import required components
import {
    SafeAreaView,
    LayoutAnimation,
    StyleSheet,
    View,
    Text,
    ScrollView,
    UIManager,
    TouchableOpacity,
    Platform,
} from 'react-native';
import { Iconviewcomponent } from '../Components/Icontag';



export default function ExpandableComponent({ item, onClickFunction }) {
    //Custom Component for the Expandable List
    const [layoutHeight, setLayoutHeight] = useState(0);

    useEffect(() => {
        if (item.isExpanded) {
            setLayoutHeight(null);
        } else {
            setLayoutHeight(0);
        }
    }, [item.isExpanded]);

    return (
        <View style={{ width: '100%', padding: 10, paddingVertical: 10, borderWidth: 0.5, borderColor: '#666', borderRadius: 5, margin: 5 }}>
            {/*Header of the Expandable List Item*/}
            <TouchableOpacity
                activeOpacity={0.8}
                onPress={onClickFunction}
                style={[styles.header, { flexDirection: 'row', alignItems: 'center' }]}>
                <View style={{ flex: 3, justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                    <Text style={styles.headerText}>
                        {item.category_name}
                    </Text>
                </View>
                <View style={{ flex: 0, justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Iconviewcomponent
                        Icontag={'Entypo'}
                        iconname={'chevron-small-down'}
                        icon_size={22}
                        iconstyle={{ color: '#666' }}
                    />
                </View>
            </TouchableOpacity>
            <View
                style={{
                    height: layoutHeight,
                    overflow: 'hidden',
                }}>
                {/*Content under the header of the Expandable List Item*/}
                {item.subcategory.map((item, key) => (
                    <TouchableOpacity
                        key={key}
                        style={styles.content}
                        onPress={
                            () => alert('Id: ' + item.id + ' val: ' + item.val)
                        }>
                        <Text style={styles.text}>
                            {/* {key}.  */}
                            {item.val}
                        </Text>
                        {/* <View style={styles.separator} /> */}
                    </TouchableOpacity>
                ))}
            </View>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleText: {
        flex: 1,
        fontSize: 22,
        fontWeight: 'bold',
    },
    header: {
        width: '95%',
        backgroundColor: '#fff',
        paddingHorizontal: 5,
        paddingVertical: 5,
        padding: 10,
    },
    headerText: {
        fontSize: 15,
        lineHeight: 25,
        color: '#666',
        fontFamily: 'Poppins-Medium',
    },
    separator: {
        height: 0.5,
        backgroundColor: '#808080',
        width: '95%',
        marginLeft: 16,
        marginRight: 16,
    },
    text: {
        fontSize: 14,
        color: '#666',
        fontFamily: 'Poppins-Regular',
        lineHeight: 25,
    },
    content: {
        paddingLeft: 10,
        paddingRight: 10,
        backgroundColor: '#fff',
    },
});