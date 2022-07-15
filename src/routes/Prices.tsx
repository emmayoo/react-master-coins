import styled from "styled-components";

interface IQuote {
  percent_change_1y: number;
  percent_change_30d: number;
  percent_change_7d: number;
  percent_change_24h: number;
  percent_change_12h: number;
  percent_change_6h: number;
  percent_change_1h: number;
  percent_change_30m: number;
  percent_change_15m: number;
  ath_price: number;
}

interface PriceProps {
  quotes: IQuote | undefined;
}

const PriceContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-shadow: 0 0 16px rgba(0, 0, 0, 0.0784313725);
  margin-top: 20px;
  border-radius: 12px;
  padding: 20px;
  color: ${(props) => props.theme.textColor};
  font-size: 18px;
  font-weight: 600;
  border: 1px solid ${(props) => props.theme.textColor}; ;
`;

const PriceDetails = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin: 10px 0;
  span {
    color: ${props => props.theme.accentColor};
  }
`;

function Price({ quotes }: PriceProps) {
  return (
    <PriceContainer>
      <PriceDetails>
        <span>15분 전</span>
        <span>{quotes?.percent_change_15m}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>1시간 전</span>
        <span>{quotes?.percent_change_1h}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>24시간 전</span>
        <span>{quotes?.percent_change_24h}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>30일 전</span>
        <span>{quotes?.percent_change_30d}%</span>
      </PriceDetails>
      <br />
      <PriceDetails>
        <span>1년 전</span>
        <span>{quotes?.percent_change_1y}%</span>
      </PriceDetails>
      <br />
    </PriceContainer>
  );
}

export default Price;