import React, {useRef} from 'react';
import Styled from 'styled-components/native';
import Images from './Images';
import {Transition, Transitioning} from 'react-native-reanimated';

const Container = Styled.TouchableWithoutFeedback``;

const Background = Styled(Transitioning.View)`
flex:auto;
flex-direction: row;
align-items: center;
justify-content: center;
border-top-width: ${props => (props.focused ? '4px' : '0px')}; 
border-color: #52c0b4
`;
const Icon = Styled.Image`
height:30px;
width:30px;
`;
const Label = Styled.Text`
font-weight:500;
margin-left:8px;
`;

const Tab = ({label, accessibilityState, onPress}) => {
  const focused = accessibilityState.selected;
  const icon = !focused ? Images.icons[label] : Images.icons[`${label}Focused`];
  const transition = (
    <Transition.Sequence>
      <Transition.Out type="fade" durationMs={0} />
      <Transition.Change interpolation="easeInOut" durationMs={100} />
      <Transition.In type="fade" durationMs={5} />
    </Transition.Sequence>
  );

  const ref = useRef();
  return (
    <Container
      onPress={() => {
        ref.current.animateNextTransition();
        onPress();
      }}>
      <Background
        focused={focused}
        ref={ref}
        transition={transition}>
        <Icon source={icon} />
      </Background>
    </Container>
  );
};
export default Tab;
