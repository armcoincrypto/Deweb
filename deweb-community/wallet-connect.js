// wallet-connect.js — MetaMask & Ronin connect + top-up transfers

function getProvider(name) {
  if (name === "Ronin") {
    return window.ronin?.provider || null;
  }
  return window.ethereum || null;
}

window.DEWEB_WALLET = {
  async connectMetaMask() {
    const eth = window.ethereum;
    if (!eth) throw new Error("MetaMask not installed. Install the extension and refresh.");
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    return { provider: "MetaMask", address: accounts[0] };
  },

  async connectRonin() {
    const ronin = window.ronin?.provider;
    if (!ronin) {
      throw new Error("Ronin wallet not found. Install the Ronin extension and refresh.");
    }
    const accounts = await ronin.request({ method: "eth_requestAccounts" });
    return { provider: "Ronin", address: accounts[0] };
  },

  /**
   * Open connected wallet to send native coin to DEWEB treasury.
   * @returns {string} transaction hash
   */
  async sendTopUp(provider, { fromAddress, treasuryAddress, valueWei }) {
    const eth = getProvider(provider);
    if (!eth) {
      throw new Error(`${provider} wallet not available. Install the extension.`);
    }
    if (!treasuryAddress) {
      throw new Error("Treasury address not configured.");
    }

    const accounts = await eth.request({ method: "eth_requestAccounts" });
    const from = fromAddress || accounts[0];
    if (!from) throw new Error("No wallet account selected.");

    const txHash = await eth.request({
      method: "eth_sendTransaction",
      params: [
        {
          from,
          to: treasuryAddress,
          value: valueWei
        }
      ]
    });
    return txHash;
  }
};
