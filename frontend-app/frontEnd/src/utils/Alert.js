import React from 'react';
import {View, Text, Alert, Modal} from 'react-native';
import { Button, Paragraph, Dialog, Portal } from 'react-native-paper';

const AlertFunc = (props) => {
    const [visible, setVisible] = React.useState(false);

    const showDialog = () => setVisible(true);
  
    const hideDialog = () => setVisible(false);
  
    return (
      <View>
        {/* <Button onPress={props.showDialog}>Show Dialog</Button> */}
        <Portal>
          <Dialog visible={props.visibility} onDismiss={props.hideDialog}>
            <Dialog.Title>Alert</Dialog.Title>
            <Dialog.Content>
              <Paragraph>This is simple dialog</Paragraph>
            </Dialog.Content>
            <Dialog.Actions>
              <Button onPress={props.exitApp}>Ok</Button>
              <Button onPress={props.hideDialog}>Cancel</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
};

export default AlertFunc;
