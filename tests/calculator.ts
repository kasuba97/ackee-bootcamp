import {
  AnchorProvider,
  setProvider,
  web3,
  workspace,
  BN,
} from "@coral-xyz/anchor";
import { Program } from "@coral-xyz/anchor";
import { Calculator } from "../target/types/calculator";
import { expect } from "chai";

describe("calculator", () => {
  // Configure the client to use the local cluster.
  setProvider(AnchorProvider.env());

  const program = workspace.Calculator as Program<Calculator>;

  // get provider
  const programProvider = program.provider as AnchorProvider;

  // keypair
  const calculatorPair = web3.Keypair.generate();

  // greeting to the calculator
  const text = "hello anchor @ackee";

  it("Is created!", async () => {
    // Add your test here.
    await program.methods
      .create(text)
      .accounts({
        calculator: calculatorPair.publicKey,
        user: programProvider.wallet.publicKey,
      })
      .signers([calculatorPair])
      .rpc()
      .then((tx) => console.log("Your transaction signature", tx));

    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );

    expect(account.greeting).to.eql(text);
  });

  it("Is addtion!", async () => {
    const num1 = new BN(5);
    const num2 = new BN(5);

    await program.methods
      .add(num1, num2)
      .accounts({
        calculator: calculatorPair.publicKey,
      })
      .rpc()
      .then((tx) => console.log("Your transaction signature", tx));

    const account = await program.account.calculator.fetch(
      calculatorPair.publicKey
    );

    expect(account.result).to.eql(new BN(10));
  });
});
