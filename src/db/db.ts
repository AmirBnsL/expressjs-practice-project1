import pgPromise from 'pg-promise';


const pgp = pgPromise();

export const db = pgp('postgresql://postgres:TsahKoLaWgTsi4m4@db.ktmuvhdhttlcjjflumcn.supabase.co:5432/postgres');
 