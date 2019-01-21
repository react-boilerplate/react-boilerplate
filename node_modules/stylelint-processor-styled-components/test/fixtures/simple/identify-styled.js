import styled from 'styled-components';

const Button1 = styled.div`
  bad-selector {
    color: red;
  }
`;

const Button2 = styled(Button1)`
  bad-selector {
    color: red;
  }
`;

const Image1 = styled.img.attrs({ src: 'url' })`
  bad-selector {
    color: red;
  }
`;

const Image2 = styled(Image1).attrs({ src: 'newUrl' })`
  bad-selector {
    color: red;
  }
`;

const Image3 = Image2.extend`
  bad-selector2 {
    color: blue;
  }
`;
