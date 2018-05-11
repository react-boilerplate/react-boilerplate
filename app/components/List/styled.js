import styled from 'styled-components';

export const ListContainer = styled.div`
  padding: 20px 15%;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 10px 15px;
  }
`;

export const ListItem = styled.div`
  border-bottom: 1px solid black;
  display: flex;
  flex-direction: column;
  height: auto;
  padding: 15px 10px;
`;

export const ListItemHeader = styled.h2`
  color: black;
  margin: 0;
  font-family: 'Montserrat';
  font-size: 1.3em;
`;

export const SubHeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const ListItemSubHeader = ListItemHeader.extend`
  font-style: italic;
  font-size: 0.8em;
  width: unset;
`;

export const ListItemContent = ListItemHeader.extend`
  font-size: 0.6em;
  margin-top: 10px;
  width: unset;
`;
