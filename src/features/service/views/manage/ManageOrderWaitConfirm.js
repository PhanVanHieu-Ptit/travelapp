import React, { useState, useEffect, useContext } from 'react';
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
import { BackgroundImage } from 'react-native-elements/dist/config';
import { ScrollView } from 'react-native-gesture-handler';
import { variables } from '../../../../common/constants/const';
import COLORS from '../../consts/colors';
import { getOrderByIdAndState } from '../../services/Order/getData';
import MyOrderWaitConfirmCard from './MyOrderWaitConfirmCard';

var host = variables.host;
function ManageOrderWaitConfirm({ navigation, route }) {
    const [listOrder, setListOrder] = useState([]);
    const [showed, setShowed] = useState(true);

    const service = route.params.service;
    const idState = route.params.idState;

    const getOrderByIdAndStateAgain = (id) => {
        getOrderByIdAndState(id, idState)
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
        getOrderByIdAndStateAgain(service.id);
    }, []);

    return (
        <ScrollView>
            <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
                <View>
                    <View>
                        <Text style={{ color: COLORS.primary, fontWeight: 'bold', margin: 10 }}>
                            {idState == 'XACNHAN' ? 'Danh sách chờ xác nhận' : ''}
                            {idState == 'THANHCONG' ? 'Danh sách đã xác nhận' : ''}
                            {idState == 'DAHUY' ? 'Danh sách đã hủy' : ''}
                            {idState == 'HOANTHANH' ? 'Danh sách đã hoàn thành' : ''}
                        </Text>
                    </View>
                    <View>
                        <BackgroundImage source={{ uri: `${host}${service.avatar}` }} style={{ height: 100 }}>
                            <Text style={{ color: COLORS.white, fontWeight: 'bold', margin: 10 }}>{service.name}</Text>
                        </BackgroundImage>
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
                                    <MyOrderWaitConfirmCard
                                        route={{
                                            order: item,
                                            getOrderByIdAndStateAgain: getOrderByIdAndStateAgain,
                                            idState: idState,
                                        }}
                                    />
                                )}
                            />
                        </View>
                    ) : (
                        ''
                    )}
                </View>
            </SafeAreaView>
        </ScrollView>
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
export default ManageOrderWaitConfirm;
