import { Injectable } from '@angular/core';
import { ethers } from 'ethers';
import { ContractService } from './contract.service';
import { ConnectService } from './connect.service';

@Injectable({
  providedIn: 'root'
})
export class EnsService {
  private registrarContractAbi = [ { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'resolver', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'owner', 'outputs': [{ 'name': '', 'type': 'address' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'label', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setSubnodeOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'ttl', 'type': 'uint64' }], 'name': 'setTTL', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': true, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }], 'name': 'ttl', 'outputs': [{ 'name': '', 'type': 'uint64' }], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'resolver', 'type': 'address' }], 'name': 'setResolver', 'outputs': [], 'payable': false, 'type': 'function' }, { 'constant': false, 'inputs': [{ 'name': 'node', 'type': 'bytes32' }, { 'name': 'owner', 'type': 'address' }], 'name': 'setOwner', 'outputs': [], 'payable': false, 'type': 'function' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'Transfer', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': true, 'name': 'label', 'type': 'bytes32' }, { 'indexed': false, 'name': 'owner', 'type': 'address' }], 'name': 'NewOwner', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'resolver', 'type': 'address' }], 'name': 'NewResolver', 'type': 'event' }, { 'anonymous': false, 'inputs': [{ 'indexed': true, 'name': 'node', 'type': 'bytes32' }, { 'indexed': false, 'name': 'ttl', 'type': 'uint64' }], 'name': 'NewTTL', 'type': 'event' } ];
  private registrarContract;

  constructor(
    private connectService: ConnectService,
    private contractService: ContractService
  ) { }

  async checkSubdomain(appname: string, username: string) {
    console.log(username + '.' + appname + '.test :' + ethers.utils.namehash(username + '.' + appname + '.test'));
    return await this.registrarContract.owner(ethers.utils.namehash(username + '.' + appname + '.test'));
  }

  async registerSubdomain(appname: string, username: string, address: string) {
    const wallet = this.connectService.getWallet();
    const signedRegistrarContract = this.registrarContract;
    console.log(signedRegistrarContract);
    console.log(ethers.utils.namehash(appname + '.test'));
    console.log(ethers.utils.keccak256(ethers.utils.toUtf8Bytes(username)));
    console.log(address);
    const tx = await signedRegistrarContract.setSubnodeOwner(ethers.utils.namehash(appname + '.test'), ethers.utils.keccak256(ethers.utils.toUtf8Bytes(username)), address);
    console.log(tx);
    console.log(ethers.utils.formatEther(tx.gasLimit), ethers.utils.formatEther(tx.gasPrice));
    await tx.wait();
    console.log('Transaction done.');
  }

  async createSubdomain(appname: string, username: string, address: string) {
    const ensAddress = this.connectService.getProvider()['network']['ensAddress'];
    console.log('Here');
    this.registrarContract = this.contractService.accessContract(ensAddress, this.registrarContractAbi);
    console.log(this.registrarContract);
    const owner = await this.checkSubdomain(appname, username);
    console.log(owner);
    if (owner === '0x0000000000000000000000000000000000000000') {
      console.log('Subdomain available');
    } else {
      console.log('Subdomain already exists; Owner:');
      console.log(owner);
      await this.registerSubdomain(appname, username, address);
    }
    return true;
  }

  verifySubdomain(appname: string, username: string) {
  }
}
