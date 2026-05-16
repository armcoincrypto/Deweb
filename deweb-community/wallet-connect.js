// wallet-connect.js — MetaMask & Ronin (window.ethereum)

window.DEWEB_WALLET = {
  async connectMetaMask() {
    const eth = window.ethereum;
    if (!eth) throw new Error("MetaMask not installed. Install the extension and refresh.");
    const accounts = await eth.request({ method: "eth_requestAccounts" });
    return { provider: "MetaMask", address: accounts[0] };
  },

  async connectRonin() {
    const ronin = window.ronin?.provider || window.ethereum;
    if (!ronin) {
      throw new Error("Ronin wallet not found. Install Ronin extension or use MetaMask.");
    }
    const accounts = await ronin.request({ method: "eth_requestAccounts" });
    return { provider: "Ronin", address: accounts[0] };
  }
};
