import styled from "styled-components";
import {
  SecondaryText,
  Title,
} from "shared/lib/designSystem";
import { Table } from "react-bootstrap";

const PortfolioPositionsContainer = styled.div`
  margin-top: 64px;
  display: flex;
  // flex-wrap: wrap;
  flex-direction: column;
  width: 50%;
  padding: 0px 20px 0px 0px;
`;

const SectionTitle = styled(Title)`
  font-size: 38px;
  line-height: 45px;
  margin-right: 16px;
  width: 100%;
  color: #E5E5E5;
`;

const tableData = [
  {id: 1, positions_name: "ETH-C", positions_type: "Covered Call", network: "Ethereum", position: "32 ETH", value_usd: "132,450.88", yield: "31.24"},
  {id: 2, positions_name: "BTC", positions_type: "Covered Call", network: "Ethereum", position: "5 BTC", value_usd: "328,871.50", yield: "43.15"},
]

const TablePart = styled(Table)`
  color: #FFFFFF;
  box-shadow: 0 0 5px 0px #121111;
  margin-top: 10px;
  border-radius:  10px;
  
  thead {
    tr{
      th {
        background-color: #010C1A;
        border: none;
        font-weight: 500;
        &:first-child {
          border-radius: 10px 0 0 0;
        }
        &:last-child {
          border-radius: 0 10px 0 0;
        }
      }
      box-shadow: 0px 1px 10px rgba(0, 0, 0, 0.1);
    }
  }
  tbody {
    tr {
      td {
        border: none; 
        padding: 0.3em 0.75em;
        vertical-align: middle;
      }
      border-style: none;
      background: rgba(35, 52, 71, 0.32);
      &:hover {
        opacity: 0.8;
      }
      &:nth-child(even) {
        background: rgba(1, 12, 25, 0.3);
      }
    }
  }
  tfoot {
    height: 10px;
    background: #ffffff;
    box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.05);
  }
`;

const ColumnIn = styled.div`
  display: flex;
  flex-direction: column;
`;


const PortfolioPositions = () => {
  return (
    <PortfolioPositionsContainer>
      <SectionTitle>Positions + Network</SectionTitle>
      <TablePart>
        <thead>
          <tr>
            <th>Positions</th>
            <th>Network</th>
            <th>Position</th>
            <th>Value USD</th>
            <th>Yield</th>
          </tr>
        </thead>
        <tbody>
        {
          tableData.map((result) => (
            <tr>
              <td>
                <ColumnIn>
                  <Title> {result.positions_name}</Title>
                  <Title fontSize={14} color={"#FFFFFF"}>{result.positions_type}</Title>
                </ColumnIn>
              </td>
              <td>
                <Title color={"#FFFFFF"}>{result.network}</Title>
              </td>
              <td>{result.position}</td>
              <td>
                ${result.value_usd}
              </td>
              <td>
                <SecondaryText color={"#00FF3D"} fontSize={15}>{result.yield}%</SecondaryText>
              </td>
            </tr>
          ))
        }
        </tbody>
        <tfoot></tfoot>
      </TablePart>
      {/* {positionContent} */}
    </PortfolioPositionsContainer>
  );
};

export default PortfolioPositions;
