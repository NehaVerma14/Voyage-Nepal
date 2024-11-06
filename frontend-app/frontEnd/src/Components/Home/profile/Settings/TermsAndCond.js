import React from 'react';
import {View} from 'react-native';
import {Button, Icon, Content, Container, Text} from 'native-base';

const TermsAndCond = ({navigation}) => {
  return (
    <Container>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Button transparent onPress={() => navigation.goBack()} large>
          <Icon name="arrow-back" style={{color: '#52c0b4', fontSize: 25}} />
        </Button>
        <Text style={{fontSize: 20, fontWeight: '800'}}>
          Terms and Conditions
        </Text>
      </View>

      <Content padder style={{padding: 10, marginBottom: 50}}>
        <Text note style={{fontSize: 18, marginBottom: 8}}>
          Last updated: June 20, 2021
        </Text>
        <Text style={{fontSize: 18, fontWeight: 'bold', marginBottom: 12}}>
          Please read these terms and conditions carefully before using Our
          Service.
        </Text>
        <Text style={{fontSize: 18, marginBottom: 15}}>
          Interpretation and Definitions
        </Text>
        <Text style={{fontSize: 18, marginBottom: 12}}>Interpretation</Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          The words of which the initial letter is capitalized have meanings
          defined under the following conditions. The following definitions
          shall have the same meaning regardless of whether they appear in
          singular or in plural.
        </Text>
        <Text style={{fontSize: 18, marginBottom: 12}}>Definitions</Text>
        <Text style={{fontSize: 17, marginBottom: 15}}>
          For the purposes of these Terms and Conditions:
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Affiliate means an entity that controls, is controlled by or is under
          common control with a party, where "control" means ownership of 50% or
          more of the shares, equity interest or other securities entitled to
          vote for election of directors or other managing authority.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Country refers to: Nepal
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Company (referred to as either "the Company", "We", "Us" or "Our" in
          this Agreement) refers to Voyage Nepal.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Device means any device that can access the Service such as a
          computer, a cellphone or a digital tablet.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Service refers to the Website.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Terms and Conditions (also referred as "Terms") mean these Terms and
          Conditions that form the entire agreement between You and the Company
          regarding the use of the Service. This Terms and Conditions agreement
          has been created with the help of the Terms and Conditions Generator.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Third-party Social Media Service means any services or content
          (including data, information, products or services) provided by a
          third-party that may be displayed, included or made available by the
          Service.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          Website refers to Voyage Nepal, accessible from
          https://www.voyagenepal.com/
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
          You means the individual accessing or using the Service, or the
          company, or other legal entity on behalf of which such individual is
          accessing or using the Service, as applicable.
        </Text>
        <Text style={{fontSize: 18, marginBottom: 11}}>
        Acknowledgment
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
        These are the Terms and Conditions governing the use of this Service and the agreement that operates between You and the Company. These Terms and Conditions set out the rights and obligations of all users regarding the use of the Service.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
        Your access to and use of the Service is conditioned on Your acceptance of and compliance with these Terms and Conditions. These Terms and Conditions apply to all visitors, users and others who access or use the Service.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
        By accessing or using the Service You agree to be bound by these Terms and Conditions. If You disagree with any part of these Terms and Conditions then You may not access the Service.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
        You represent that you are over the age of 18. The Company does not permit those under 18 to use the Service.
        </Text>
        <Text style={{fontSize: 15, marginBottom: 15}}>
        Your access to and use of the Service is also conditioned on Your acceptance of and compliance with the Privacy Policy of the Company. Our Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your personal information when You use the Application or the Website and tells You about Your privacy rights and how the law protects You. Please read Our Privacy Policy carefully before using Our Service.
        </Text>
      </Content>
    </Container>
  );
};

export default TermsAndCond;
