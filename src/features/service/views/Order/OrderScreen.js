import React, { useState, useEffect } from 'react';
import {
    SafeAreaView,
    StatusBar,
    View,
    Text,
    Pressable,
    TextInput,
    Button,
    StyleSheet,
    TouchableOpacity,
    Alert,
} from 'react-native';
// import DatePicker from 'react-native-date-picker';
import DatePicker, { getFormatedDate } from 'react-native-modern-datepicker';
import { Icon } from 'react-native-elements';
import COLORS from '../../consts/colors';
import style from '../../style/Home/style';
import { ScrollView } from 'react-native-gesture-handler';
import { getSheduleByServiceId } from '../../services/getData';
import ListSheduleForService from './ListSheduleForService';
import { orderService } from '../../services/Order/postData';
import moment from 'moment';

function OrderScreen({ navigation, route }) {
    console.log('route', route);
    const service = route.params.service;
    const state = route.params.state;
    const order = route.params.order;
    const [selectedDate, setSelectedDate] = useState(state == 'update' ? order.dateStart : '');
    const [number, setNumber] = useState(state == 'update' ? order.number : '');
    const [phone, setPhone] = useState(state == 'update' ? order.phone : '');

    const [listShedule, setListShedule] = useState([]);
    const [selectedShedule, setSelectedShedule] = useState(state == 'update' ? order.idSchedule : '');

    useEffect(() => {
        getSheduleByServiceId(service.id)
            .then(function (res) {
                setListShedule(res.data);
                console.log('res', res);
            })
            .catch((err) => {
                console.log('🚀 ~ file: listCategory-screen home ~ line 17 ~ error', err);
            });
    }, []);

    const checkData = () => {
        if (selectedDate.trim() == '') {
            Alert.alert('Thông báo!', 'Không được để trống ngày!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }

        if (selectedShedule.trim() == '') {
            Alert.alert('Thông báo!', 'Bạn chưa chọn suất!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (number.trim() == '') {
            Alert.alert('Thông báo!', 'Không được để trống số lượng!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (Number(number.trim()) < 1) {
            Alert.alert('Thông báo!', 'Số lượng phải lớn hơn hoặc bằng 1!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        if (phone.trim() != '' && phone.trim().length < 10) {
            Alert.alert('Thông báo!', 'Số điện thoại không hợp lệ!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return false;
        }
        return true;
    };

    const bookService = () => {
        if (checkData())
            orderService(selectedShedule, selectedDate, number, phone, service)
                .then(function (res) {
                    console.log('res', res);
                    if (res.status == 'success') {
                        Alert.alert('Thông báo!', res.message, [
                            { text: 'Đóng', onPress: () => navigation.navigate('HomeScreen') },
                        ]);
                    } else {
                        Alert.alert('Thông báo!', res.message, [{ text: 'Đóng', onPress: () => {} }]);
                    }
                })
                .catch((err) => {
                    console.log('🚀 ~ file: bookService ~ line 17 ~ error', err);
                });
    };

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: COLORS.white }}>
            <StatusBar translucent={false} backgroundColor={COLORS.primary} />

            <View style={styles.header}>
                <Icon
                    name="arrow-back"
                    size={28}
                    color={COLORS.white}
                    onPress={() => navigation.navigate('HomeScreen')}
                />
                <Text style={style.headerTitle}>Đặt dịch vụ</Text>
            </View>
            <ScrollView>
                <View>
                    <Text style={styles.textStyle}>Chọn ngày(*)</Text>
                    <DatePicker
                        selected={state == 'update' ? order.dateStart : moment().format('YYYY-MM-DD')}
                        // current={moment().format('YYYY-MM-DD')}
                        minimumDate={moment().format('YYYY-MM-DD')}
                        // maximumDate="2020-07-25"
                        mode="calendar"
                        minuteInterval={30}
                        onSelectedChange={(date) => setSelectedDate(date)}
                    />
                    {/* <Text style={styles.textStyle}>Chọn thời gian kết thúc</Text>
                    <DatePicker onSelectedChange={(date) => setSelectedDateEnd(date)} /> */}
                    <Text style={styles.textStyle}>Chọn suất(*)</Text>
                    <ListSheduleForService
                        navigation={navigation}
                        route={{
                            listShedule: listShedule,
                            selectedShedule: selectedShedule,
                            setSelectedShedule: setSelectedShedule,
                        }}
                    />
                    <Text style={styles.textStyle}>Chọn số lượng(*)</Text>
                    <TextInput
                        style={styles.inputStyle}
                        placeholder="Nhập số lượng"
                        keyboardType="numeric"
                        defaultValue={state == 'update' ? order.number : ''}
                        onChangeText={(newText) => setNumber(newText)}
                    ></TextInput>
                    <Text style={styles.textStyle}>Số điện thoại</Text>
                    <TextInput
                        placeholder="Nhập số điện thoại"
                        style={styles.inputStyle}
                        keyboardType="numeric"
                        defaultValue={state == 'update' ? order.phone : ''}
                        onChangeText={(newText) => setPhone(newText)}
                    />
                    {state == 'update' ? (
                        <TouchableOpacity style={styles.btnDatStyle} onPress={() => {}}>
                            <Text style={styles.txtDatStyle}>Cập nhật</Text>
                        </TouchableOpacity>
                    ) : (
                        <TouchableOpacity style={styles.btnDatStyle} onPress={() => bookService()}>
                            <Text style={styles.txtDatStyle}>Xác nhận</Text>
                        </TouchableOpacity>
                    )}
                </View>
            </ScrollView>
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
    textStyle: {
        color: COLORS.dark,
        fontWeight: 'bold',
        fontSize: 18,
    },
    inputStyle: { borderWidth: 1, padding: 10, margin: 10, borderRadius: 10 },
    btnDatStyle: {
        backgroundColor: COLORS.primary,
        height: 60,
        alignItems: 'center',
        borderRadius: 20,
        padding: 20,
        margin: 20,
    },
    txtDatStyle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: COLORS.white,
    },
});
export default OrderScreen;
