import {StyleSheet, Text, View, Modal, Image} from 'react-native';
import React from 'react';
import Colors from '../../../../constants/Color';

import SponsorStyle from './SponsorStyle';
import {Icon, Button, Container} from 'native-base';

const success = ({navigation}) => {
  return (
    <Modal transparent visible={true}>
      <View style={styles.modalBg}>
        <View style={styles.modContainer}>
          <Icon
            type="Ionicons"
            name="checkmark-circle-sharp"
            style={{color: Colors.themeColor, fontSize: 150}}
          />
          <Text style={styles.texts}>Congratulations</Text>
          <Text style={styles.text2}>You successfully became a sponsor </Text>
          <Button
            title="Next"
            width={130}
            style={{
              marginTop: 20,
              marginLeft: 60,
              backgroundColor: Colors.themeColor,
              borderRadius: 30,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={() => {
              navigation.navigate('SponsorPage');
            }}>
            <Text style={{color: 'white', fontSize: 18}}>OK</Text>
          </Button>
        </View>
      </View>
    </Modal>
  );
};

export default success;

const styles = StyleSheet.create({
  modalBg: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modContainer: {
    width: '80%',
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    elevation: 5,
    height: '50%',
    alignItems: 'center',
  },
  texts: {
    marginTop: 20,
    fontSize: 20,
    color: '#52C0B4',
    lineHeight: 30,
  },
  text2: {
    fontSize: 15,
    color: '#52C0B4',
    lineHeight: 30,
  },
});