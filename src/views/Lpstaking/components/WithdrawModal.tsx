import BigNumber from 'bignumber.js'
import React, { useCallback, useMemo, useState } from 'react'
import { ModalActions, ModalInput } from 'src/components/Modal'
import { getFullDisplayBalance } from 'src/helpers/formatBalance'
import { Button, IconButton, MinusIcon, LinkExternal } from '@pancakeswap/uikit'
import Fade from '@material-ui/core/Fade';
import { Modal} from "@material-ui/core";
import Backdrop from '@material-ui/core/Backdrop';

import "./modal.scss";


interface WithdrawModalProps {
  max: BigNumber
  onConfirm: (amount: string) => void
  tokenName?: string
}

export const WithdrawModal: React.FC<WithdrawModalProps> = ({ onConfirm, max, tokenName = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const closeModal = () => { setIsOpen(false)}
  const openModal = () => {setIsOpen(true)}

  const [val, setVal] = useState('')
  const [pendingTx, setPendingTx] = useState(false)

  const fullBalance = useMemo(() => {
    return getFullDisplayBalance(max, 18, 15)
  }, [max])

  const valNumber = new BigNumber(val)
  const fullBalanceNumber = new BigNumber(fullBalance)

  const handleChange = useCallback(
    (e: React.FormEvent<HTMLInputElement>) => {
      if (e.currentTarget.validity.valid) {
        setVal(e.currentTarget.value.replace(/,/g, '.'))
      }
    },
    [setVal],
  )

  const handleSelectMax = useCallback(() => {
    setVal(fullBalance)
  }, [fullBalance, setVal])

  return (
    <div >
      <IconButton variant="tertiary" onClick={openModal} mr="6px">
        <MinusIcon color="primary" width="14px" />
      </IconButton>
      <Modal
        className="modal"         
        open={isOpen} 
        onClose={closeModal}  
        aria-labelledby="modal-modal-title" 
        aria-describedby="modal-modal-description" 
        disableScrollLock={false}
        BackdropComponent={Backdrop}
        closeAfterTransition
        BackdropProps={{
            timeout: 800,
        }}
      >
        <Fade in={isOpen}>
          <div className=' modal-content'> 
            <ModalInput
              onSelectMax={handleSelectMax}
              onChange={handleChange}
              value={val}
              max={fullBalance}
              symbol={tokenName}
              inputTitle={'SURF-BNB UNSTAKE'}
            />
              <ModalActions>
                <Button variant="secondary"  width="100%" onClick={closeModal} disabled={pendingTx}>
                  Cancel
                </Button>
                <Button
                  width="100%"
                  disabled={pendingTx || !valNumber.isFinite() || valNumber.eq(0) || valNumber.gt(fullBalanceNumber)}
                  onClick={async () => {
                    setPendingTx(true)
                    try {
                      await onConfirm(val)
                    } catch (e) {
                      console.error(e)
                    } finally {
                      setPendingTx(false)
                    }
                  }}
                >
                  {pendingTx ? 'Pending Confirmation' : 'Confirm'}
              </Button>
            </ModalActions>
          </div>
        </Fade>
      </Modal>
    </div>
  )
}
