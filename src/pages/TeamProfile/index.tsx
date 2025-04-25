import { useState } from "react"
import UserListModal from "../../components/UserListModal"
import { AppContent } from "../../layouts/app-layout/AppLayout"
import { mockUsers } from "../../mocks/user.mock"
import UserListWidget from "../../components/UserListWidget"


export default function TeamProfile() {
    const [modalOpened, setModalOpened] = useState(true);
    return (
      <AppContent>
        <>
          <UserListWidget title="Участники" users={mockUsers} length={2} showMore={() => {}}/>
          <UserListModal open={modalOpened} users={mockUsers.slice(0, 10)} length={15}title="Участники" onClose={()=>{setModalOpened(false)}} children={<></>}/>
        </>
      </AppContent>
    )
}
