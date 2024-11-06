import React from 'react';
import {View, Text} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

const SkeletonLoader = props => {
  return (
    <SkeletonPlaceholder>
      <SkeletonPlaceholder.Item
        width={props.width}
        height={props.height}
        borderRadius={props.radius}
        marginBottom={props.mb}
        marginLeft={props.ml}
        marginRight={props.mr}
      />
    </SkeletonPlaceholder>
  );
};

export default SkeletonLoader;
