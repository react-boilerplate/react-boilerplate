import styled from 'styled-components';

export default styled.div`
  background-color: #fff;
  flex-direction: ${props =>
    props.flexDirection ? props.flexDirection : 'row'};
  display: flex;
  margin: 0.75em;
`;
