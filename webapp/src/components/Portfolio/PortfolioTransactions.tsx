import { useEffect, useState } from "react";
import styled from "styled-components";
import {
  SecondaryText,
  Title,
} from "shared/lib/designSystem";
import sizes from "shared/lib/designSystem/sizes";
import { Table } from "react-bootstrap";
import ReactPaginate from 'react-paginate';

const PortfolioTransactionsContainer = styled.div`
  margin-top: 64px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  width: 50%;
`;

const SectionTitle = styled(Title)`
  font-size: 38px;
  line-height: 45px;
  margin-right: 16px;
  width: 100%;
  color: #E5E5E5;

  @media (max-width: ${sizes.md}px) {
    width: 100%;
    margin-bottom: 16px;
  }
`;

const TableTransaction = styled(Table)`
  color: #F3F3F3;
  box-shadow: 0 0 5px 0px #121111;
  margin-top: 10px;
  border-radius: 10px;
  thead {
    tr {
      
      th {
        background: #010C1A;
        border: none;
        font-weight: 500;
        &:first-child {
          border-radius: 10px 0 0 0;
        }
        &:last-child {
          border-radius: 0 10px 0 0;
        }
      }
    }
  }
  tbody {
    background: rgba(35, 52, 71, 0.32);
    tr {
      td {
        border: none;
        font-weight: 500;
        vertical-align: middle;
      }
      &:nth-child(even) {
        background: rgba(1, 12, 25, 0.3);
      }
    }
  }
  tfoot {
    height: 10px;
    background: #021325;
    box-shadow: 0px -4px 20px rgba(0, 0, 0, 0.05);
  }
`;

const PaginationView = styled(ReactPaginate)`
  display: flex;
  list-style: none;
  & > li {
    margin-right: 10px;
    padding: 10px 15px;
    width: 30px;
    height: 30px;
    color: white;
    display: flex;
    & > a {
      color: white;
      margin-top: -7px;
      margin-left: -4px;
    }
  }
  & > .selected {
    background: #242E44;
    border-radius: 20px;
    // padding: 5px;
  }
`;

const tableData = [
  { id: 1, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$132,450.18"},
  { id: 2, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 3, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 4, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 5, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "10 ETH", Value: "$56,213"},
  { id: 6, Actions: "Withdraw", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "4 BTC", Value: "$56,213"},
  { id: 7, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$56,213"},
  { id: 8, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 9, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$132,450.18"},
  { id: 10, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 11, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 12, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 13, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "10 ETH", Value: "$56,213"},
  { id: 14, Actions: "Withdraw", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "4 BTC", Value: "$56,213"},
  { id: 15, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$56,213"},
  { id: 16, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 17, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$132,450.18"},
  { id: 18, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 19, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 20, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 21, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 22, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 23, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 24, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "10 ETH", Value: "$56,213"},
  { id: 25, Actions: "Withdraw", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "4 BTC", Value: "$56,213"},
  { id: 26, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$56,213"},
  { id: 27, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 28, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$132,450.18"},
  { id: 29, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 30, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 31, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 32, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 33, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "12 ETH", Value: "$56,213"},
  { id: 34, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 35, Actions: "Withdraw", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "10 ETH", Value: "$56,213"},
  { id: 36, Actions: "Withdraw", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "4 BTC", Value: "$56,213"},
  { id: 37, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$56,213"},
  { id: 38, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
  { id: 39, Actions: "Deposit", Strategy_name: "ETH-C", Strategy_type: "Cover Call", Position: "32 ETH", Value: "$132,450.18"},
  { id: 40, Actions: "Deposit", Strategy_name: "BTC", Strategy_type: "Cover Call", Position: "5 BTC", Value: "$56,213"},
]

const PortfolioTransactions = () => {

  const [currentItems, setCurrentItems] = useState<{}[]>([]);
  const [itemsPerPage, setItemsPerPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  // Here we use item offsets; we could also use page offsets
  // following the API or data you're working with.
  const [itemOffset, setItemOffset] = useState(0);

  useEffect(() => {
    // Fetch items from another resources.
    const endOffset = itemOffset + itemsPerPage;
    console.log(`Loading items from ${itemOffset} to ${endOffset}`);
    setCurrentItems(tableData.slice(itemOffset, endOffset));
    console.log("currentItems", currentItems);
    setPageCount(Math.ceil(tableData.length / itemsPerPage));
    setItemsPerPage(8);
  }, [itemOffset, itemsPerPage, currentItems]);

  // Invoke when user click to request another page.
  const handlePageClick = (event: { selected: number; }) => {
    const newOffset = (event.selected * itemsPerPage) % tableData.length;
    console.log(
      `User requested page number ${event.selected}, which is offset ${newOffset}`
    );
    setItemOffset(newOffset);
  };

  return (
    <PortfolioTransactionsContainer>
      <SectionTitle>Transaction History</SectionTitle>
      <TableTransaction>
        <thead>
          <tr>
            <th>Actions</th>
            <th>Strategy</th>
            <th>Position</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          {
            currentItems.map((result: any) => (
              <tr>
                <td style={{justifyContent: "center"}}>
                  <Title> {result.Actions}</Title>
                </td>
                <td>
                  <div>
                    <Title> {result.Strategy_name}</Title>
                  </div>
                    <SecondaryText> {result.Strategy_type}</SecondaryText>
                  
                </td>
                <td>
                  <Title>{result.Position}</Title>
                </td>
                <td><Title>{result.Value}</Title></td>
              </tr>
            ))
          }
        </tbody>
        <tfoot></tfoot>
      </TableTransaction>
      {/* <div> */}
        <PaginationView
          breakLabel="..."
          nextLabel=">"
          onPageChange={handlePageClick}
          pageRangeDisplayed={3}
          pageCount={pageCount}
          previousLabel="< " marginPagesDisplayed={3}                    // renderOnZeroPageCount={null}
        />
      {/* </div> */}
     
      {/* <Pagination
        page={page}
        total={Math.ceil(processedTransactions.length / perPage)}
        setPage={setPage}
      /> */}
    </PortfolioTransactionsContainer>
  );
};

export default PortfolioTransactions;
