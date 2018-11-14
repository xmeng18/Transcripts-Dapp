import { Injectable } from '@angular/core';
import { EnsService } from './ens.service';
import { ContractService } from './contract.service';
import { ConnectService } from './connect.service';

@Injectable()
export class RegisterService {
  constructor(
    private ensService: EnsService,
    private contractService: ContractService,
    private connectService: ConnectService
  ) { }

  async createIdContract(address: string) {
    const abi = [ { 'constant': true, 'inputs': [], 'name': 'user', 'outputs': [ { 'name': '', 'type': 'address' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'subdomain', 'outputs': [ { 'name': '', 'type': 'string' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' }, { 'inputs': [ { 'name': 'owner', 'type': 'address' }, { 'name': 'name', 'type': 'string' } ], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'constructor' }, { 'constant': false, 'inputs': [ { 'name': 'key', 'type': 'bytes32' } ], 'name': 'addKey', 'outputs': [], 'payable': false, 'stateMutability': 'nonpayable', 'type': 'function' }, { 'constant': true, 'inputs': [], 'name': 'getKeys', 'outputs': [ { 'name': '', 'type': 'bytes32[]' } ], 'payable': false, 'stateMutability': 'view', 'type': 'function' } ];
    const bytecode = '0x608060405234801561001057600080fd5b506040516104ba3803806104ba8339810180604052810190808051906020019092919080518201929190505050806001908051906020019061005392919061009b565b50816000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff1602179055505050610140565b828054600181600116156101000203166002900490600052602060002090601f016020900481019282601f106100dc57805160ff191683800117855561010a565b8280016001018555821561010a579182015b828111156101095782518255916020019190600101906100ee565b5b509050610117919061011b565b5090565b61013d91905b80821115610139576000816000905550600101610121565b5090565b90565b61036b8061014f6000396000f300608060405260043610610062576000357c0100000000000000000000000000000000000000000000000000000000900463ffffffff1680632150c518146100675780634f8632ba146100d357806360e6cfd81461012a57806377fcff501461015b575b600080fd5b34801561007357600080fd5b5061007c6101eb565b6040518080602001828103825283818151815260200191508051906020019060200280838360005b838110156100bf5780820151818401526020810190506100a4565b505050509050019250505060405180910390f35b3480156100df57600080fd5b506100e8610247565b604051808273ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200191505060405180910390f35b34801561013657600080fd5b50610159600480360381019080803560001916906020019092919050505061026c565b005b34801561016757600080fd5b506101706102a1565b6040518080602001828103825283818151815260200191508051906020019080838360005b838110156101b0578082015181840152602081019050610195565b50505050905090810190601f1680156101dd5780820380516001836020036101000a031916815260200191505b509250505060405180910390f35b6060600280548060200260200160405190810160405280929190818152602001828054801561023d57602002820191906000526020600020905b81546000191681526020019060010190808311610225575b5050505050905090565b6000809054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600281908060018154018082558091505090600182039060005260206000200160009091929091909150906000191690555050565b60018054600181600116156101000203166002900480601f0160208091040260200160405190810160405280929190818152602001828054600181600116156101000203166002900480156103375780601f1061030c57610100808354040283529160200191610337565b820191906000526020600020905b81548152906001019060200180831161031a57829003601f168201915b5050505050815600a165627a7a72305820e31e8950a17d761893384433bb2739671c0c518876c72eb269d5578b5606e04c0029';
    const args = [
      address,
      name
    ];
    return await this.contractService.deployContract(abi, bytecode, args);
  }

  registerKey() {

  }

  async register(appname: string, username: string) {
    const address = this.connectService.getAddress();
    const idContract = await this.createIdContract(address);
    console.log('Received contract: ' + idContract.address);
    this.registerKey();
    this.ensService.createSubdomain(appname, username, idContract.address);
  }
}
