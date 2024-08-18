use anchor_lang::prelude::*;

declare_id!("AVRiBJuuLqtLojDtEAy6XPe4NuxSnzZjNZN9GghzMKNg");

#[program]
pub mod calculator {
    use super::*;
    use anchor_lang::solana_program::entrypoint_deprecated::ProgramResult;

    pub fn create(ctx: Context<Create>, init_msg: String) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.greeting = init_msg;
        Ok({})
    }

    pub fn add(ctx: Context<Addition>, num1: i64, num2: i64) -> ProgramResult {
        let calculator = &mut ctx.accounts.calculator;
        calculator.result = num1 + num2;
        Ok(())
    }
}

#[derive(Accounts)]
pub struct Create<'info> {
    #[account(init,payer=user,space=264)]
    pub calculator: Account<'info, Calculator>,

    #[account(mut)]
    pub user: Signer<'info>,
    pub system_program: Program<'info, System>,
}

#[derive(Accounts)]
pub struct Addition<'info> {
    #[account(mut)]
    pub calculator: Account<'info, Calculator>,
}

#[account]
pub struct Calculator {
    greeting: String,
    result: i64,
}
