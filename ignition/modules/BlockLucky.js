const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const TICKET_PRICE = 10000000000000000n; // 0.01 ETH en wei

module.exports = buildModule("BlockLuckyModule", (m) => {
  const ticketPrice = m.getParameter("ticketPrice", TICKET_PRICE);

  const blockLucky = m.contract("BlockLucky", [ticketPrice]);

  return { blockLucky };
});
