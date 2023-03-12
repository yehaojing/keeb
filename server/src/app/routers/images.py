from fastapi import APIRouter, UploadFile, Depends, HTTPException
from fastapi.responses import Response
from sqlalchemy.orm import Session

import src.app.models as models
import src.app.schemas as schemas
from src.app.dependencies import get_session, get_current_active_user


router = APIRouter(
    tags=["images"]
)


def find_image(
    image_id: int,
    session: Session = Depends(get_session)
):
    image = session.query(models.Image).get(image_id)

    if not image:
        raise HTTPException(
            status_code=404,
            detail=f"image with id {image_id} not found"
        )

    return image


@router.post(
    "/{keyboard_id}",
    response_model=schemas.ImageBase
)
async def upload_image(
    file: UploadFile,
    keyboard_id: int,
    session: Session = Depends(get_session),
    current_user: schemas.UserInDB = Depends(get_current_active_user)
):

    image_db = models.Image(
        image=await file.read(),
        owner_id=current_user.id,
        keyboard_id=keyboard_id
    )

    session.add(image_db)
    session.commit()
    session.refresh(image_db)
    session.close()

    print(image_db)

    return image_db


@router.get(
    "/{image_id}",
    response_model=schemas.ImageRetrieve,
    responses={
        200: {
            "content": {"image/png": {}},
            "description": "Return an image.",
        }
    }
)
async def get_image(
    image: models.Image = Depends(find_image),
):
    return Response(content=image.image, media_type="image/png")


@router.delete(
    "/{image_id}"
)
def delete_image(
    session: Session = Depends(get_session),
    image=Depends(find_image),
):
    session.delete(image)
    session.commit()

    return {"detail": f"image with id {image.id} deleted"}
