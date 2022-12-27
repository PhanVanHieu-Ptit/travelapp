import React, { useEffect, useState, createContext } from 'react';
import { Alert, Image, SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Text } from 'react-native-animatable';
import { Icon } from 'react-native-elements';
import COLORS from '../../consts/colors';
import TopTabOrderForCustomer from '../../navigations/TopTabOrderForCustomer';
import { getOrderByIdUserAndState, getOrderByIdUserAndStateForPage } from '../../services/Order/getData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useDispatch, useSelector } from 'react-redux';

function OrderManageForCustomer({ navigation, route }) {
    const logined = useSelector((state) => {
        state.logined;
    });
    const dispatch = useDispatch();
    // const [idUser, setIdUser] = useState('7055dcb1-67ce-4c5f-bf51-03863f7e5778');

    useEffect(() => {
        async function check() {
            const userRole = await AsyncStorage.getItem('@roleid');
            console.log(logined);
            console.log(userRole);

            if (logined === false || logined === null || logined === undefined) {
                navigation.navigate('Login');
            }
            if (
                userRole == 'ADMIN' ||
                userRole == 'STAFF' ||
                userRole == 'BUSINESS_PARTNER_HOTEL' ||
                userRole == 'BUSINESS_PARTNER_SERVICE' ||
                userRole == 'BUSINESS_PARTNER_FOOD'
            ) {
                console.log('login');
                Alert.alert('Bạn không phải là khách hàng', 'Bạn có muốn đăng xuất ?', [
                    {
                        text: 'Hủy',
                        onPress: () => {
                            navigation.goBack();
                        },
                        style: 'destructive',
                    },
                    {
                        text: 'Đồng ý',
                        onPress: () => {
                            setModalVisible(!modalVisible);
                            AsyncStorage.removeItem('@userid');
                            AsyncStorage.removeItem('@roleid');
                            setRole('');
                            dispatch({ type: 'logout' });
                            setTimeout(() => {
                                setModalVisible(modalVisible);
                                navigation.navigate({
                                    name: 'Login',
                                    params: { userid: '' },
                                    merge: true,
                                });
                            }, 1000);
                        },
                        style: 'default',
                    },
                ]);
            }
            // setIdUser(userid)
        }
        check();
    }, []);

    const listState = ['XACNHAN', 'THANHCONG', 'DAHUY', 'HOANTHANH'];
    // const idUser = AsyncStorage.getItem('@userid');
    useEffect(() => {
        AsyncStorage.getItem('@userid').then((userId) => {
            listState.forEach((element) =>
                getOrderByIdUserAndState(userId, element)
                    .then((res) => {
                        dispatch({ type: 'ADD_LIST_ORDER', payload: res.data.content });
                    })
                    .catch((err) => {
                        console.log('🚀 ~ file: getOrderByIdAndState ~ error', err);
                    }),
            );
        });
    }, []);

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent={false} backgroundColor={COLORS.primary} />
            {/* <View style={styles.header}>
                <Icon name="arrow-back" size={28} color={COLORS.white} onPress={() => navigation.navigate('HomeTab')} />
                <Text style={style.headerTitle}>Lịch sử đặt</Text>
            </View> */}

            <TopTabOrderForCustomer />
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
});
export default OrderManageForCustomer;
