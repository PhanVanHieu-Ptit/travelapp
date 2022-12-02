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
import DatePicker from 'react-native-modern-datepicker';
import { Icon } from 'react-native-elements';
import Moment from 'moment';
import COLORS from '../../consts/colors';
import style from '../../style/Home/style';
import { ScrollView } from 'react-native-gesture-handler';
import { getSheduleByServiceId } from '../../services/getData';
import ListSheduleForService from './ListSheduleForService';

function OrderScreen({ navigation, route }) {
    console.log('route', route);
    const [selectedDate, setSelectedDate] = useState('');
    const [number, setNumber] = useState('');
    const [phone, setPhone] = useState('');

    const [listShedule, setListShedule] = useState([]);
    const [selectedShedule, setSelectedShedule] = useState('');

    useEffect(() => {
        getSheduleByServiceId(route.params.id)
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
            return;
        }
        if (selectedShedule.trim() == '') {
            Alert.alert('Thông báo!', 'Bạn chưa chọn suất!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return;
        }
        if (number.trim() == '') {
            Alert.alert('Thông báo!', 'Không được để trống số lượng!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return;
        }
        if (Number(number.trim()) < 1) {
            Alert.alert('Thông báo!', 'Số lượng phải lớn hơn hoặc bằng 1!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return;
        }
        if (phone.trim() != '' && phone.trim().length < 10) {
            Alert.alert('Thông báo!', 'Số điện thoại không hợp lệ!', [
                { text: 'OK', onPress: () => console.log('OK Pressed') },
            ]);
            return;
        }
    };

    const bookService = () => {};

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
                    <DatePicker onSelectedChange={(date) => setSelectedDate(date)} />
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
                        onChangeText={(newText) => setNumber(newText)}
                    ></TextInput>
                    <Text style={styles.textStyle}>Số điện thoại</Text>
                    <TextInput
                        placeholder="Nhập số điện thoại"
                        style={styles.inputStyle}
                        keyboardType="numeric"
                        onChangeText={(newText) => setPhone(newText)}
                    />
                    <TouchableOpacity style={styles.btnDatStyle} onPress={() => checkData()}>
                        <Text style={styles.txtDatStyle}>Thanh toán</Text>
                    </TouchableOpacity>
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
        fontSize: 18,
        fontWeight: 'bold',
        color: COLORS.white,
    },
});
export default OrderScreen;
