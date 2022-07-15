//import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { fetchCoins } from "../api";

interface ICoin {
	id: string,
	name: string,
	symbol: string,
	rank: number,
	is_new: boolean,
	is_active: boolean,
	type: string
}

const Container = styled.div`
  padding: 0px 20px;
	max-width: 480px;
	margin: 0 auto;
`;

const Header = styled.header`
  height: 15vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
	font-size: 48px;
	color: ${props => props.theme.accentColor};
`;

const CoinsList = styled.ul``;

const Coin = styled.li`
	background-color: white;
	color: ${props => props.theme.textColor};
	margin-bottom:10px;
	padding: 20px;
	border-radius: 10px;
	
	a {
		transition: color 0.2s ease-in;
		display: block; /* li 클릭이 되도록 하기 위함 */

		display: flex;
		align-items: center;
	}

	&:hover {
		a {
			color: ${props => props.theme.accentColor}
		}
	}
`;

const Img = styled.img`
	width: 35px;
	height: 35px;
	margin-right: 10px;
`;

const Coins = () => {
	const { isLoading, data } = useQuery<ICoin[]>("allCoins", fetchCoins);
	// const [coins, setCoins] = useState<ICoin[]>([]);
	// const [loading, setLoading] = useState(false);
	// useEffect(() => {
	// 	setLoading(true);
	// 	(async () => {
	// 		const response = await fetch("https://api.coinpaprika.com/v1/coins");
	// 		const json = await response.json();
	// 		setCoins(json.slice(0, 100));
	// 		setLoading(false);
	// 	})();
	// }, []);

	return (
		<Container>
			<Header>
				<Title>코인</Title>
			</Header>
			{isLoading ? ("Loading...") : (
				<CoinsList>
					{data?.slice(0,50).map(coin =>
						<Coin key={coin.id}>
							<Link to={`/${coin.id}`} state={{ name: coin.name }}>
								<Img src={`https://coinicons-api.vercel.app/api/icon/${(coin.symbol).toLowerCase()}`} />
								{coin.name}
							</Link>
						</Coin>
					)}
				</CoinsList>
			)}
		</Container>
	);
};

export default Coins;