ALTER TABLE public.invoice_has_payment
    ADD COLUMN "invoiceHasPaymentAmoAmount" numeric(10, 2);

ALTER TABLE public.invoice_has_payment
    ADD COLUMN "invoiceHasPaymentAmcAmount" numeric(10, 2);

ALTER TABLE public.bank_account
    ADD COLUMN "bankAccountLastSynchroniseBankAccount" date;

ALTER TABLE public.bank_account
    ADD COLUMN "bankAccountSychronizationDelay" integer;

ALTER TABLE public.bank_account
    ADD COLUMN "bankAccountUserName" character varying;
    ALTER TABLE public.bank_account
    ADD COLUMN "bankAccountUserPassword" character varying;


#-- update 1.15
ALTER TABLE public.visit
    ADD COLUMN "visitFicheSuivIsPrinted" boolean;