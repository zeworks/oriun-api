export interface DeleteClientRepository {
	delete: (id: string) => Promise<boolean | null>
}
