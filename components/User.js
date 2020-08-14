import React, {Component} from 'react';
import {Text, StyleSheet, View, Image, Platform} from 'react-native';
import PropTypes from 'prop-types';

export default class User extends React.Component {

  //construtor para uso do props
  constructor(props){
    super(props);
  }

  //renderização do componente
  render(){
    return(
      <View style={styles.loader}>
        <Image
            style={styles.tinyLogo}
            source={this.props.image_source}
          />
      </View>

    );
  }
}

const styles = StyleSheet.create({
   loader:{
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff"
   },
   tinyLogo: {
    width: 200,
    height: 200,
    marginBottom: 30
  },
});

User.propTypes = {image_source: PropTypes.string.isRequired};