import React, { useState, useEffect } from 'react';
import {
    Image,
    SafeAreaView,
    StatusBar,
    StyleSheet,
    TouchableOpacity,
    View,
    Modal,
    Alert,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { Text } from 'react-native-animatable';
import COLORS from '../../consts/colors';
import { getOrderByIdAndState } from '../../services/Order/getData';
import MyOrderConfirmedCard from './MyOrderConfirmedCard';
import MyOrderWaitConfirmCard from './MyOrderWaitConfirmCard';

function ManageOrderConfirmed({ navigation, route }) {
    const [showed, setShowed] = useState(true);
    const [listOrder, setListOrder] = useState([]);
    const getOrderByIdAndStateAgain = (id) => {
        getOrderByIdAndState(id, 'THANHCONG')
            .then(function (res) {
                setListOrder([...res.data.content]);
                setShowed(false);
            })
            .catch((err) => {
                setListOrder([]);
                setShowed(false);
                console.log('🚀 ~ file: getOrderByIdAndState-screen ~ line 17 ~ error', err);
            });
    };

    useEffect(() => {
        getOrderByIdAndStateAgain(route.params.id);
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <View>
                <View>
                    <Text style={{ color: COLORS.primary, fontWeight: 'bold', margin: 10 }}>Danh sách đã xác nhận</Text>
                </View>
                <ActivityIndicator size="large" color={COLORS.primary} animating={showed} />
                {!showed ? (
                    <View>
                        <FlatList
                            contentContainerStyle={{
                                flexDirection: 'column',
                            }}
                            horizontal
                            showsHorizontalScrollIndicator={false}
                            data={listOrder}
                            renderItem={({ item }) => (
                                <MyOrderConfirmedCard
                                    route={{ order: item, getOrderByIdAndStateAgain: getOrderByIdAndStateAgain }}
                                />
                            )}
                        />
                    </View>
                ) : (
                    ''
                )}
            </View>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    header: {
        paddingVertical: 20,
        paddingHorizontal: 20,
        flexDirection: 'row',
        backgroundColor: COLORS.primary,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
        backgroundColor: COLORS.dark,
        opacity: 0.9,
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        // alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
});
export default ManageOrderConfirmed;
